import { Component, OnInit, Input, ViewChild, NgZone, AfterViewInit, OnDestroy } from '@angular/core';

declare var $:any;
declare var HomeJs:any;



@Component({
  selector: 'ecg-view',
  templateUrl: './ecg-view.component.html'
})
export class EcgViewComponent implements OnInit {

  

  @ViewChild('ecgCanvas') ecgCanvas;
  ecgCanvasContext;

  @Input("width") width = 600;
  @Input("height") height = 400;

  ch1 = [];
  totalSamplesReceived = 0;

  currAnomationFrameId;
 
  constructor(private zone:NgZone) {
    HomeJs.EcgViewUi = {
      //dummy: (args)=>{this.zone.run(()=>{this.dummy(args)})},
      onNewOneSecondData: (ch1)=>{this.zone.run(()=>{this.onNewOneSecondData(ch1)})}
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    //this.ch1 = [];
    this.ch1 = Array(this.MIN_SAMPLE_COUNT_FOR_PLOTTING).fill(this.EMPTY_SIGNAL_VALUE, 0, this.MIN_SAMPLE_COUNT_FOR_PLOTTING - 1);
    console.log(this.ch1.length + " samples initialized");

    console.log("ECG VIEW: " + this.width + "x" + this.height);

    this.ecgCanvasContext = this.ecgCanvas.nativeElement.getContext("2d");

    this.currAnomationFrameId = requestAnimationFrame(()=>{
      this.plotCurrEcgWindow();
    });

    this.totalSamplesReceived = 0;
    this.firstOneSecondReceived = true;
  }

  pushArray(arr, newArr) {
    arr.push.apply(arr, newArr);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.currAnomationFrameId);
  }

  

  readonly SAMPLE_RATE = 250;
  readonly ECG_WINDOW_MS = 5000;
  //readonly FPS = 2;
  readonly ECG_WINDOW_REFRESH_MS = 50;
  
  
  readonly SAMPLE_COUNT_TO_DISCARD = 25; //this.SAMPLE_RATE/(1000/this.ECG_WINDOW_MS); //this.ECG_WINDOW_REFRESH_MS * this.SAMPLE_RATE / 1000;

  readonly ECG_WINDOW_SAMPLE_COUNT = this.ECG_WINDOW_MS * this.SAMPLE_RATE / 1000;

  readonly MIN_SAMPLE_COUNT_FOR_PLOTTING = (this.ECG_WINDOW_SAMPLE_COUNT * 1.1); //((this.ECG_WINDOW_MS/1000) * 2 * this.SAMPLE_RATE);



  readonly EMPTY_SIGNAL_VALUE = -999999999999;


  // get one second data from bluetooth/java layer

  firstOneSecondReceived = false;
  public onNewOneSecondData(oneSecondData) { 

    this.firstOneSecondReceived = true;
    
    console.log("Received new " + oneSecondData.length + "; total samples: " + this.totalSamplesReceived + "; " + this.samplesToMs(this.SAMPLE_RATE, this.totalSamplesReceived) + " ms");

    if(this.ch1 == undefined) {
      console.log("undefined ch1");
      this.ch1 = [];
      this.ch1.fill(this.EMPTY_SIGNAL_VALUE, 0, this.MIN_SAMPLE_COUNT_FOR_PLOTTING);
    }

    this.pushArray(this.ch1, oneSecondData);

    this.totalSamplesReceived += oneSecondData.length; 

    //console.log("ch1 length: " + this.ch1.length); 
    //console.log(this.ch1);

    this.drawTimeElapsed();
  }




  async plotCurrEcgWindow() {

    //console.log(">> ch1 length: " + this.ch1.length);

    if(this.ch1.length < this.MIN_SAMPLE_COUNT_FOR_PLOTTING) {
      //console.log("Not enough samples to plot. Returning. " + this.ch1.length + " samples.");

      setTimeout(()=>{
        this.currAnomationFrameId = requestAnimationFrame(()=>{
          this.plotCurrEcgWindow(); 
        });
      }, this.ECG_WINDOW_REFRESH_MS);

      return;
    }

    

    let currEcgWindowArr = this.ch1.slice(0, this.ECG_WINDOW_SAMPLE_COUNT);
    
    // draw currEcgWindowArr
    this.drawEcgOnCanvas(currEcgWindowArr);

    if(this.firstOneSecondReceived) 
      this.ch1.splice(0, this.SAMPLE_COUNT_TO_DISCARD);

    setTimeout(()=>{
      this.currAnomationFrameId = requestAnimationFrame(()=>{
        this.plotCurrEcgWindow(); 
      });
    }, this.ECG_WINDOW_REFRESH_MS);
  }


  private drawEcgOnCanvas(ecgWindowArr) {

    var xSep = this.width/ecgWindowArr.length;

    //console.log("Plot: xSep = " + xSep);
    //console.log("Plotting " + ecgArr.length + " samples");
    //console.log(" ");
    //console.log(" ");
    //console.log(" ");
    //console.log(ecgArr);

    //var max = Math.max.apply(null, ecgWindowArr);
    var max = -99999999;
    ecgWindowArr.forEach(y=>{
      if(y > max && y != this.EMPTY_SIGNAL_VALUE) 
        max = y;
    });
    
    var min = 99999999;
    ecgWindowArr.forEach(y=>{
      if(y < min && y != this.EMPTY_SIGNAL_VALUE) 
        min = y;
    });

    

    

    // making all positive
    ecgWindowArr = ecgWindowArr.map(y => {
      if(y == this.EMPTY_SIGNAL_VALUE)
        return y;
      else 
        return y + Math.abs(min);
    });

    //console.log(ecgWindowArr);
    //console.log("Max: " + max + ", Min: " + min);

    // scaling to canvas
    var scale = this.height / (max-min);

    var scaledEcgWindowArr = ecgWindowArr.map(y => {
      if(y == this.EMPTY_SIGNAL_VALUE)
        return this.EMPTY_SIGNAL_VALUE;
      else
       return Math.floor(this.height - (y*scale));
    }); // inverted scale

    //console.log(scaledEcgWindowArr);

    var prevX = 0; 
    var prevY = scaledEcgWindowArr[0];
    var x = 0;

    this.ecgCanvasContext.clearRect(0, 0, this.width, this.height);

    //this.drawGrid(this.width, this.height, this.ECG_WINDOW_MS);

    
    scaledEcgWindowArr.forEach((y)=>{

        this.ecgCanvasContext.beginPath();
        this.ecgCanvasContext.lineWidth = 1;

        
        this.ecgCanvasContext.moveTo(prevX,prevY);
        this.ecgCanvasContext.lineTo(x,y);
        if(y == this.EMPTY_SIGNAL_VALUE) 
          this.ecgCanvasContext.strokeStyle = '#fff';
        else
          this.ecgCanvasContext.strokeStyle = '#f00';
        
        this.ecgCanvasContext.stroke(); 

        prevX = x;
        prevY = y;

        x += xSep;
    });
    

    this.drawTimeElapsed();

  }

  private drawTimeElapsed() {

    let totalElapsedMs = this.samplesToMs(this.SAMPLE_RATE, this.totalSamplesReceived);
    let timeElapsedStr = this.msToMmSs(totalElapsedMs);


    this.ecgCanvasContext.fillStyle = "rgba(245, 245, 245, 0.75)";
    this.ecgCanvasContext.fillRect(0, 0, 100, 20);

    this.ecgCanvasContext.fillStyle = "#235";
    this.ecgCanvasContext.font = "10pt Arial";
    this.ecgCanvasContext.fillText(timeElapsedStr + " elapsed", 8, 15);
  }

  samplesToMs(sampleRate, samples) {
    return Math.ceil((samples * 1000) / sampleRate);
  }

  msToMmSs(duration) {
        let milliseconds = Math.floor((duration%1000)/100);
        let seconds = Math.floor((duration/1000)%60);
        let minutes = Math.floor((duration/(1000*60))%60)
        let hours = Math.floor((duration/(1000*60*60))%24);

        let hoursStr = (hours < 10) ? "0" + hours : hours;
        let minutesStr = (minutes < 10) ? "0" + minutes : minutes;
        let secondsStr = (seconds < 10) ? "0" + seconds : seconds;

        return minutesStr + ":" + secondsStr;
  }




// grid
private drawGrid(canvasWidth, canvasHeight, stripWidthMs) {

    var largeSquareWidth = (canvasWidth * 200) / stripWidthMs;
    var smallSquareWidth = (canvasWidth * 40) / stripWidthMs;

    this.ecgCanvasContext.lineWidth = 1;


    // large squares
    // vertical lines
    var i = 0;
    var currX = 0;
    while(currX < canvasWidth) {

        //console.log("Plot: Vertical Line at x = " + currX);

        this.ecgCanvasContext.beginPath();
        this.ecgCanvasContext.moveTo(currX, 0);
        this.ecgCanvasContext.lineTo(currX, canvasHeight);

        if(i % 5 == 0) // thick
        {
            this.ecgCanvasContext.strokeStyle = 'rgba(255,0,0,0.5)';
        }
        else // thin
        {
            //this.ecgCanvasContext.strokeStyle = 'rgba(255,0,0,0.1)';
        }

        this.ecgCanvasContext.stroke();

        currX += smallSquareWidth;
        i++;
    }


    var j = 0;
    var currY = 0;
    while(currY < canvasHeight) {

        //console.log("Plot: Horizontal Line at y = " + currY);

        this.ecgCanvasContext.beginPath();
        this.ecgCanvasContext.moveTo(0, currY);
        this.ecgCanvasContext.lineTo(canvasWidth, currY);

        if(j % 5 == 0) // thick
        {
            this.ecgCanvasContext.strokeStyle = 'rgba(255,0,0,0.5)';
        }
        else // thin
        {
            //this.ecgCanvasContext.strokeStyle = 'rgba(255,0,0,0.1)';
        }

        this.ecgCanvasContext.stroke();

        currY += smallSquareWidth;
        j++;
    }


}









}









