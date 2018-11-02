import { Component, ViewChild, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '../services/shared-service.service';

declare var OT: any;
declare var $: any;

@Component({
  selector: 'evisit-view',
  templateUrl: './evisit-view.component.html'
})
export class EVisitViewComponent implements OnInit, AfterViewInit {

  @ViewChild('mainView') mainView;
  @ViewChild('myVideo') myVideo;
  @ViewChild('peerVideo') peerVideo;

  @Input()
  width = 200;

  @Input()
  height = 200;

  @Input()
  opentokSessionId = "";

  @Input()
  opentokToken = "";

  @Input()
  opentokApiKey = "";


  audioInputDevices;
  videoInputDevices;

  mainWidth = -1;
  mainHeight = -1;


  session;
  currCameraIndex;

  constructor(private snackBar: MatSnackBar, private sharedService: SharedService) {

  }

  ngOnInit() {
    console.log(this.width + " x " + this.height);
  }

  ngAfterViewInit() {

    this.initVideoContainers();
    this.getSelectedCamera();
  }

  myVideoWidth;
  myVideoHeight;
  peerVideoWidth;
  peerVideoHeight;

  initVideoContainers() {
    this.mainWidth = this.width; //this.mainView.nativeElement.clientWidth;
    this.mainHeight = this.height; //this.mainView.nativeElement.clientHeight;

    this.myVideoWidth = 0.2 * this.mainWidth;
    this.myVideoHeight = (0.75 * this.myVideoWidth);
    this.myVideo.nativeElement.style.width = this.myVideoWidth + "px";
    this.myVideo.nativeElement.style.height = this.myVideoHeight + "px";


    //let peerVideoHeight = 0.75 * peerVideoWidth;
    this.peerVideoHeight = 0.9 * this.mainHeight;
    this.peerVideo.nativeElement.style.height = this.peerVideoHeight + "px";
    this.peerVideoWidth = ((4 / 3) * this.peerVideoHeight);
    this.peerVideo.nativeElement.style.width = this.peerVideoWidth + "px";

    this.peerVideo.nativeElement.style.top = (- this.myVideoHeight + 10) + "px";
    this.peerVideo.nativeElement.style.left = (this.myVideoWidth - 2) + "px";

    $("<style type='text/css'> #evisitMyVideo video{width:" + this.myVideoWidth + "px; height:" + this.myVideoHeight + "px;}</style>").appendTo("head");
    $("<style type='text/css'> #evisitPeerVideo video{width:" + this.peerVideoWidth + "px; height:" + this.peerVideoHeight + "px;}</style>").appendTo("head");
  }

  getSelectedCamera() {

    OT.getDevices((error, devices) => {

      this.audioInputDevices = devices.filter(function (element) {
        return element.kind == "audioInput";
      });
      this.videoInputDevices = devices.filter(function (element) {
        return element.kind == "videoInput";
      });

      console.log("Video Devices: ", this.videoInputDevices);

      this.currCameraIndex = parseInt(localStorage.getItem("cameraSelected"))

      if (Number.isNaN(this.currCameraIndex)) {
        this.currCameraIndex = 0;
        console.log("NaN hai. Khaega!")
      }

      console.log("Curr Camera: " + this.currCameraIndex);

      this.initializeSession();

    });

  }



  handleOTError(error) {
    if (error) {
      //alert(error.message);
      this.snackBar.open(error.message, "", { duration: 5000 });
      console.error(error);
    }
  }


  initializeSession() {

    this.session = OT.initSession(this.opentokApiKey, this.opentokSessionId);

    // Subscribe to a newly created stream
    this.session.on('streamCreated', (event) => {
      this.session.subscribe(event.stream, 'evisitPeerVideo', {
        insertMode: 'replace',
        width: this.peerVideoWidth,
        height: this.peerVideoHeight,
      }, this.handleOTError);
    });

    // Create a publisher 
    console.log("CurrCamera: " + this.currCameraIndex);
    let publisher = OT.initPublisher('evisitMyVideo', {
      insertMode: 'replace',
      width: this.myVideoWidth,
      height: this.myVideoHeight,
      resolution: '1280x720',
      videoSource: this.videoInputDevices[this.currCameraIndex].deviceId
    }, this.handleOTError);

    // Connect to the session
    this.session.connect(this.opentokToken, (error) => {
      // If the connection is successful, initialize a publisher and publish to the session
      if (error) {
        this.handleOTError(error);
      } else {
        this.session.publish(publisher, this.handleOTError);
      }
    });
  }


  switchCamera() {

    console.log(this.videoInputDevices);
    var newCamera = (this.videoInputDevices.length > (this.currCameraIndex + 1)) ? (this.currCameraIndex + 1) : 0;
    if (newCamera == this.currCameraIndex) {
      return;
    }
    this.currCameraIndex = newCamera;
    localStorage.setItem("cameraSelected", this.currCameraIndex);
    console.log("new camera: " + newCamera);
    let publisher = OT.initPublisher('myVideo', {
      insertMode: 'replace',
      resolution: '1280x720',
      width: this.myVideoWidth,
      height: this.myVideoHeight,
      videoSource: this.videoInputDevices[this.currCameraIndex].deviceId
    }, this.handleOTError);

    this.session.publish(publisher, this.handleOTError);
  }


  endCall() {
    console.log("ending call ... ");
    //location.href="about:blank";
  }


  ngOnDestroy() {
    console.log("EVisit End: onDestroy()");

    //TODO
    this.session.disconnect();
  }
}
