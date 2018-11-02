import { Inject, Component, OnInit, AfterViewInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../services/shared-service.service';
import { ThresholdFunction } from './enum-threshold-function';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


declare var JV_BTReadings:any;

@Component({
  selector: 'chf-checkup',
  templateUrl: './chf-checkup.component.html'
})
export class ChfCheckupComponent implements OnInit {


  @Input("width") width = 600;
  @Input("height") height = 400;
  @Input("auth0Headers") auth0Headers;
  @Input("patientId") patientId;

  private currWeight = 0.0;
  private currWeightTimestamp = -1;

  private currO2Sat = 0.0;
  private currO2SatTimestamp = -1;

  private currQuestion = undefined;
  private questionList = [];
  private answerList = [];
  private instructionList = [];

  private patientVitalThresholdCriteria = [];
  private patientVitalAgeCriteria = [];
  
  private checkupCompleted = false;

  

  SERVER_BASE_URL = this.sharedService.SERVER_BASE_URL;
  URL_FETCH_VITALS = this.SERVER_BASE_URL + "/vitals/last30days";

  constructor(public dialog: MatDialog, private sharedService: SharedService, private changeRef:ChangeDetectorRef) {

    this.checkupCompleted = false;
    this.instructionList = [];
    this.initQuestionList();
    this.initPatientThresholdCriteria();
    this.initPatientVitalAgeCriteria();
  }

  log(obj1?:any, obj2?:any) {
    if(obj2 == undefined) {
      console.log("ChfCheckupComponent: " + obj1);
    }
    else  {
      console.log("ChfCheckupComponent: " + obj1, obj2);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.log("afterViewInit()");


    this.startCheckup();
  }

  
  private fetchPatientVitals(onFinished) {

    this.vitalsAvailable = false;

    this.log("auth0Headers: ", this.auth0Headers);
    this.sharedService.ajaxGetCall(this.URL_FETCH_VITALS + "?patientId="+this.patientId, this.auth0Headers, (response)=>{
      
      this.log("vitals response: ", response.body);
      var vitals = JSON.parse(response.body);

      var weightArr = vitals.filter(item=>{return item.type==this.sharedService.VITAL_TYPE_WEIGHT+""});
      var spo2Arr = vitals.filter(item=>{return item.type==this.sharedService.VITAL_TYPE_SPO2+""});

      var latestWeight = weightArr[0];
      var latestSpo2 = spo2Arr[0];

      this.log("latestWeight: ", latestWeight);
      this.log("latestSpo2: ", latestSpo2);

      this.setCurrWeight(latestWeight.v1, latestWeight.timestampMs);
      this.setCurrO2(latestSpo2.v2, latestSpo2.timestampMs);

      this.vitalsAvailable = true; 

      onFinished();
    });
  }


  private setTestVitals(onFinished) {

    this.log("Setting test vitals ... ");

    setTimeout(()=>{

      //let currWeightTimestamp = 1517974368000;
      let currWeightTimestamp = new Date().getTime();

      //let currO2SatTimestamp = 1517974368000;
      let currO2SatTimestamp = new Date().getTime(); //1517974368000;
      

      this.setCurrWeight(161, currWeightTimestamp);
      this.setCurrO2(87, currO2SatTimestamp);

      this.vitalsAvailable = true;

      onFinished();

    }, 5000);

    
  }



  private getPatientThresholdCriteriaOld() {
    this.patientVitalThresholdCriteria = [
      {
        vital: this.sharedService.VITAL_TYPE_WEIGHT, 
        threshold_function: ThresholdFunction.ABOVE, 
        threshold_value: 160, 
        unit: "lbs",
        duration_seconds: 86400
      },
      {
        vital: this.sharedService.VITAL_TYPE_SPO2, 
        threshold_function: ThresholdFunction.BELOW, 
        threshold_value: 88, 
        unit: "&"
      }
    ]
  }

  private initPatientThresholdCriteria() {
    this.patientVitalThresholdCriteria = [];
    this.patientVitalThresholdCriteria[this.sharedService.VITAL_TYPE_WEIGHT] = "this.currWeight > 160";
    this.patientVitalThresholdCriteria[this.sharedService.VITAL_TYPE_SPO2] = "this.currO2Sat < 88";
  }

  private initPatientVitalAgeCriteria() {
    
    this.patientVitalAgeCriteria = [];
    this.patientVitalAgeCriteria[this.sharedService.VITAL_TYPE_WEIGHT] = "((new Date().getTime() - this.currWeightTimestamp)/1000) > 86400";
    this.patientVitalAgeCriteria[this.sharedService.VITAL_TYPE_SPO2] = "((new Date().getTime() - this.currO2SatTimestamp)/1000) > 4800";
  }

  private isThresholdViolated(vital) {
    this.log("eval("+this.patientVitalThresholdCriteria[vital]+")");
    return eval(this.patientVitalThresholdCriteria[vital]);
  }

  private isVitalOld(vital) {
    this.log("eval("+this.patientVitalAgeCriteria[vital]+")");
    return eval(this.patientVitalAgeCriteria[vital]);
  }


  private initQuestionList() {
    this.questionList = [
        {id:"weight_vital", type:"vital", vital:this.sharedService.VITAL_TYPE_WEIGHT, short_text: "Weight (lbs)", long_text: "What's your blood oxygen saturation?"},
        {id:"spo2_vital", type:"vital", vital:this.sharedService.VITAL_TYPE_SPO2, short_text: "O2 Sat (%)", long_text: "What's your body weight in pounds?"},
        {id:"heavy_meal_q", type:"boolean", short_text: "Heavy Meal?", long_text: "You have gained weight. Did you just consume a heavy meal?"},
        {id:"swelling_q", type:"boolean", short_text: "Feet/Stomach Swollen?", long_text: "Is your feet or stomach (or both) swollen?"},
        {id:"short_breath_q", type:"boolean", short_text: "Shortness of Breath?", long_text: "Are you finding it difficult to breathe?"},
        {id:"workout_q", type:"boolean", short_text: "Heavy Workout/Labor Work?", long_text: "Did you just perform a heavy workout or labor work?"},
        {id:"chest_pain_q", type:"boolean", short_text: "Chest Pain?", long_text: "Are you experiencing chest pain?"},
        {id:"confused_q", type:"boolean", short_text: "Confused?", long_text: "Are you feeling confused or disoriented?"}
    ];
  }
  
  private cancelCheckup() {
    location.reload();
  }


  vitalsAvailable = false;
  private startCheckup() {

    this.log("Starting Checkup!");

    this.initQuestionList();

    this.checkupCompleted = false;
    this.instructionList = [];
    this.answerList = [];

    this.redLogicCompleted = false;

    this.heavyMealBool = false;
    this.swellingBool = false;
    this.checkWeightLogicCompleted = false;

    this.shortnessOfBreath = false;
    this.workoutOrLabor = false;
    this.spo2LogicComplete = false;
    
    this.vitalsAvailable = false;

    //this.setTestVitals(()=>{this.runCheckup();});

    this.fetchPatientVitals(()=>{this.runCheckup();});


    //this.runCheckup();
  }

  

  private runCheckup() {

    this.log("Running Check up");

    this.checkRed();
  }

  private setCurrO2(o2Percent, timestamp) {
    
    this.currO2Sat = o2Percent;
    this.currO2SatTimestamp = timestamp;

    this.log("Setting O2Sat: " + o2Percent);
    let question = this.questionList.find(qitem=>qitem.id=="spo2_vital");
    this.setAnswer(o2Percent, question.id);
    
  }

  private setCurrWeight(weightLbs, timestamp) {

    this.currWeight = weightLbs;
    this.currWeightTimestamp = timestamp;

    this.log("Setting Weight: " + weightLbs);
    let question = this.questionList.find(qitem=>qitem.id=="weight_vital");
    this.setAnswer(weightLbs, question.id);
  }

  heavyMealBool = false;
  swellingBool = false;
  checkWeightLogicCompleted = false;

  private checkWeightLogic() {

    if(this.checkWeightLogicCompleted) {
      this.checkSpo2Logic();
      return;
    }

    let question = this.questionList.find(qitem=>qitem.id=="weight_vital");
    this.log("Question: ", question);
    this.log("Answer List: ", this.answerList);

    if(!(question.id in this.answerList))
    {
      this.log("Weight Not Available", question);
      this.speak("Please check your weight and run Check Up again!");
      this.instructionList.push(new Instruction("text", "Please take your weight and run check up again"));

      this.checkWeightLogicCompleted = true;

      this.onCheckupFinished();
      
      return;
    }
    else // Weight value available
    {
      let currWeight = this.answerList[question.id].answer;
      this.log("Curr Weight: " + currWeight);

      let currWeightTimestamp = this.currWeightTimestamp;

      if(this.isVitalOld(this.sharedService.VITAL_TYPE_WEIGHT)) {
        this.log("Weight Value Old", question);
        this.speak("Your weight was taken a long time ago. Please check your weight and run Check Up again!");
        this.instructionList.push(new Instruction("text", "Old Weight. Please take your weight and run check up again"));

        this.checkWeightLogicCompleted = true;

        this.onCheckupFinished();
        
        return;
      }

      // weight threshold violated
      if(this.isThresholdViolated(this.sharedService.VITAL_TYPE_WEIGHT)) {

        // call first responder
        this.log("You have gained weight");

        // heavy meal
        let question = this.questionList.find(qitem=>qitem.id=="heavy_meal_q");
        this.log("Question: ", question);
        this.log("Answer List: ", this.answerList);

        if(!(question.id in this.answerList)) // heavy meal not answered
        {
          this.log("Not Answered", question);
      
          this.askQuestion(question);
        }
        else // answered heavy meal
        {
          // Answer is YES
          if(this.answerList[question.id].answer) 
          {
            this.log("YES HAD A HEAVY MEAL");
            this.heavyMealBool = true;
          }
          else  // Answer is NO
          {
            this.log("did not have heavy meal");
            this.heavyMealBool = false;
          }

          // swelling
          let question1 = this.questionList.find(qitem=>qitem.id=="swelling_q");
          this.log("Question: ", question1);
          this.log("Answer List: ", this.answerList);

          if(!(question1.id in this.answerList)) // swelling not answered
          {
            this.log("Not Answered", question1);
        
            this.askQuestion(question1);
          }
          else // answered swelling
          {
            // Answer is YES
            if(this.answerList[question1.id].answer) 
            {
              this.log("YES Swelling");
              this.swellingBool = true;
              
            }
            else  // Answer is NO
            {
              this.log("did not have swelling");
              this.swellingBool = false;
            }

            if(this.swellingBool) 
            { 
              if(this.heavyMealBool)
                this.instructionList.push(new Instruction("text", "500mg lasix"));
              else
                this.instructionList.push(new Instruction("text", "200mg lasix"));
            }
            else {
              // do nothing
            }

            this.checkWeightLogicCompleted = true;

            this.checkSpo2Logic();
          }
        }

        
      }
      else // weight threshold NOT violated .. good standing
      {
        this.log("Weight Threshold NOT violated");

        this.checkWeightLogicCompleted = true;

        this.checkSpo2Logic();
      }
    }
  }

  //readonly URL_NEBULIZER_YOUTUBE = "https://www.youtube.com/v/TrFBgzha2QQ?version=3&controls=0&rel=0&autoplay=1&iv_load_policy=3&start=29&end=160";
  readonly URL_NEBULIZER_YOUTUBE = "assets/video/nebulizer.mp4";
  

  shortnessOfBreath = false;
  workoutOrLabor = false;
  spo2LogicComplete = false;
  private checkSpo2Logic() {
    // swelling
    // both no: Okay
    // if swelling: 500mg lasix. then();
    // if heavy meal and no swelling: 200mg lasix then();

    if(this.spo2LogicComplete) {
      this.onCheckupFinished();
      return;
    }

    this.log("Checking spo2 logic");


    let question = this.questionList.find(qitem=>qitem.id=="spo2_vital");
    this.log("Question: ", question);
    this.log("Answer List: ", this.answerList);

    if(!(question.id in this.answerList))
    {
      this.log("Spo2 Not Available", question);
      this.speak("Please check your Blood Oxygen and run Check Up again!");
      this.instructionList.push(new Instruction("text", "Please take your Blood Oxygen and run check up again"));
      this.onCheckupFinished();
      
      return;
    }
    else // o2Sat value available
    {
      let currO2Sat = this.answerList[question.id].answer;
      this.log("Curr O2Sat: " + currO2Sat);

      if(this.isVitalOld(this.sharedService.VITAL_TYPE_SPO2)) {
        this.log("O2 Value Old", question);
        this.speak("Your blood oxygen was taken a long time ago. Please check take a new Blood Oxygen reading and run Check Up again!");
        this.instructionList.push(new Instruction("text", "Old Blood Oxygen. Please take a new blood oxygen level and run check up again"));

        this.checkWeightLogicCompleted = true;

        this.onCheckupFinished();
        
        return;
      }


      // spo2 threshold violated
      if(this.isThresholdViolated(this.sharedService.VITAL_TYPE_SPO2)) {

        // call first responder
        this.log("Low Oxygen");

        // heavy meal
        let question = this.questionList.find(qitem=>qitem.id=="short_breath_q");
        this.log("Question: ", question);
        this.log("Answer List: ", this.answerList);

        if(!(question.id in this.answerList)) // shortness breath not answered
        {
          this.log("Not Answered", question);
      
          this.askQuestion(question);
        }
        else // answered shortness breath
        {
          // Answer is YES
          if(this.answerList[question.id].answer) 
          {
            this.log("YES Short of Breath");
            this.shortnessOfBreath = true;
          }
          else  // Answer is NO
          {
            this.log("No Shortness of breath");
            this.shortnessOfBreath = false;

            this.onCheckupFinished();

            return;
          }

          // workout or labor
          let question1 = this.questionList.find(qitem=>qitem.id=="workout_q");
          this.log("Question: ", question1);
          this.log("Answer List: ", this.answerList);

          if(!(question1.id in this.answerList)) // workout not answered
          {
            this.log("Not Answered", question1);
        
            this.askQuestion(question1);
          }
          else // answered workout
          {
            // Answer is YES
            if(this.answerList[question1.id].answer) 
            {
              this.log("YES Did workout");
              this.workoutOrLabor = true;
              
            }
            else  // Answer is NO
            {
              this.log("did not have swelling");
              this.workoutOrLabor = false;
            }

            // shortness of breath is assumed if here!

            if(this.workoutOrLabor)
              this.instructionList.push(new Instruction("text", "Take rest for 2 hours and run Check Up again."));
            else
              this.instructionList.push(new Instruction("video", "Use a nebulizer.", this.URL_NEBULIZER_YOUTUBE));

            this.onCheckupFinished();
          }
        }

        
      }
      else // o2 threshold NOT violated .. good standing
      {
        this.log("O2 Threshold NOT violated");
        this.onCheckupFinished();
      }
    }
  }




  redLogicCompleted = false;
  private checkRed() {

    if(this.redLogicCompleted) {
      this.checkWeightLogic();
      return;
    }

    let question = this.questionList.find(qitem=>qitem.id=="chest_pain_q");
    this.log("Question: ", question);
    this.log("Answer List: ", this.answerList);

    if(!(question.id in this.answerList))
    {
      this.log("Not Answered", question);
      
      this.askQuestion(question);
    }
    else // chest pain answered
    {
      if(this.answerList[question.id].answer) {
        // call first responder
        this.log("Calling First Responder!");
        this.instructionList.push(new Instruction("text", "Calling First Responder Please Wait ... "));

        this.redLogicCompleted = true;
        this.onCheckupFinished();
        return;
      }
      else // NO CHEST PAIN ... asking confused
      {
        this.log("No chest pain!");

        let question = this.questionList.find(qitem=>qitem.id=="confused_q");
        if(!(question.id in this.answerList))
        {
          this.log("Not Answered", question);
          this.askQuestion(question);
        }
        else // answered
        {
          if(this.answerList[question.id].answer) 
          {
            this.log("Calling First Responder!");
            this.instructionList.push(new Instruction("text", "Calling First Responder Please Wait ... "));
            this.redLogicCompleted = true;
            this.onCheckupFinished();
            return;
          }
          else {
            this.log("Red Check Okay! No problem");
            this.redLogicCompleted = true;
            this.checkWeightLogic();
          }
        }   
      }
    }
  }


  

  private askQuestion(question) {

    this.speak(question.long_text);

    this.currQuestion = question;

    this.changeRef.detectChanges();
  }

  private speak(str) {
    this.log("Speaking '" + str + "'");
    console.log("Speaking TTS: '" + str + "'");
    JV_BTReadings.speak(str);
  }

  answerValues = [];
  private setAnswer(answer, qId) {
    
    //this.questionList.find(item=>item.q.id==qId).a = boolAnswer;
    let question = this.questionList.find(qitem => qitem.id == qId);
    this.log("Setting answer for: ", question);

    var ansObj = {question: question, answer: answer};

    this.answerList[qId] = ansObj;
    this.answerValues.push(ansObj);
    
    //this.log("Answer List: ", this.answerList);

    this.changeRef.detectChanges();
    
    this.runCheckup();
  }

  private onCheckupFinished() {
    this.checkupCompleted = true;
  }

  private displayInstructions() {

  }

  private openYoutubeDialog(url) {

    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 10;
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 10;

    let dialogRef = this.dialog.open(YoutubeDialog, {
      disableClose:true,
      width: (w) + "px",
      height: (h) + "px",
      data: { youtube_url: this.URL_NEBULIZER_YOUTUBE, w:w, h:h }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


  private syncCheckupWithServer() {

  }


}





export class Instruction {
  
  type:string;
  text:string;
  obj:any;

  constructor(type:string, text:string, obj?:any) {
    this.type = type;
    this.text = text;
    this.obj = obj;
  }
}






@Component({
  selector: 'youtube-dialog',
  template: `
    <iframe #iframeEl [width]="w*0.75" [height]="h*0.7" [style.width]='w' [style.height]='h' [src]=""  frameborder="0"></iframe>
    <button mat-button mat-dialog-close color="warn"><i class="fas fa-window-close"></i> <span>Close</span></button>
  `,
})
export class YoutubeDialog {

  w = 0;
  h = 0;
  youtube_url = "";

  @ViewChild("iframeEl") iframeEl; 

  constructor(
    public dialogRef: MatDialogRef<YoutubeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.youtube_url = data.youtube_url;
      this.w = data.w;
      this.h = data.h;

      console.log("Window width: " + data.w + "x" + data.h);
      console.log("Opening " + this.youtube_url);

      setTimeout(()=>{
        let iframeElement = this.iframeEl.nativeElement;
        console.log(iframeElement);
        //iframeElement.src = this.youtube_url;
        //iframeElement.contentWindow.location.href = this.youtube_url;

        //readonly URL_NEBULIZER_YOUTUBE = "assets/video/nebulizer.mp4";

        
        iframeElement.src = "assets/chf/nebulizervideo.html";
      }, 2000); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

