import { Component, OnInit, OnDestroy, NgZone, AfterViewInit, AfterViewChecked, ViewChild, Input, Output, ElementRef, Renderer, ChangeDetectorRef, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SharedService} from '../services/shared-service.service';
import {JavaCallService} from '../services/java-call.service';
import {DevicelistService} from '../services/devicelist.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

declare var HomeJs:any;
declare var JV_SharedPreferences:any;
declare var JV_BTReadings:any;
declare var SP:any;
declare var $:any;
//declare var shared:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //providers : [ SharedService, JavaCallService ]
})
export class AppComponent implements OnInit {

  @ViewChild('tvTd') tvTd;
  @ViewChild('tvTopDiv') tvTopDiv;
  @ViewChild('tvMesgDiv') tvMesgDiv;
  @ViewChild('evisitIFrame') evisitIFrame;

  lastOperationStartedAt = -1;
  lastOperationCancelledAt = -1;

  mainAppReferenceStr;

  title = 'app';
  patientProfile:any;
  auth0Headers:any;

  eVisitState = {
      IN_AN_EVISIT: false,
      currDoctorProfile: {},
      currEvisitId: "",
      currOpentokToken: "",
      currOpentokSessionId: "",
      currOpentokApiKey: ""
    };

  mainTvMessage = "";
  vitalReadingMiniMesg = "";

  tvWidth = 100;
  tvHeight = 100;

  tvMessageTimeoutId;

  TV_VIEW_HOME = "TV_VIEW_HOME";
  TV_VIEW_EVISIT_FETCHING_ONLINE_DOCTORS = "TV_VIEW_EVISIT_FETCHING_ONLINE_DOCTORS";
  TV_VIEW_EVISIT_ONLINE_DOCTORS_LIST_READY = "TV_VIEW_EVISIT_ONLINE_DOCTORS_LIST_READY";
  TV_VIEW_EVISIT_REQUESTING_LIST_READY = "TV_VIEW_EVISIT_REQUESTING_LIST_READY";
  TV_VIEW_EVISIT_ENTERING_DOCTORS_OFFICE = "TV_VIEW_EVISIT_ENTERING_DOCTORS_OFFICE"
  TV_VIEW_EVISIT_IN_WAITING_ROOM = "TV_VIEW_EVISIT_IN_WAITING_ROOM";
  TV_VIEW_EVISIT_IN_SESSION = "TV_VIEW_EVISIT_IN_SESSION";
  TV_VIEW_CHECKUP = "TV_VIEW_CHECKUP";

  currTvView = "";


  currStuff = "";

  //constructor(public snackBar: MatSnackBar) {
  constructor(public snackBar: MatSnackBar, private sharedService:SharedService,
        private javaCallService:JavaCallService, private changeRef:ChangeDetectorRef,
        private deviceListService:DevicelistService, private zone:NgZone,
        private dialog:MatDialog) {

        this.currStuff = "Savio";
        console.log("output of eval: " + eval("this.currStuff=='Savio'"));

        this.initEVisitState();

        HomeJs.MainUi = {
            dummy: (args)=>{this.zone.run(()=>{this.dummy(args)})},
            //onNewDataCh1: (sampleArr) => {this.zone.run(()=>{this.onNewDataCh1(sampleArr)})},
            toastThis: (text)=>{this.zone.run(()=>{this.snackBar.open(text, "", {duration:2000})})},
            
            onSppDevicesDiscovered: (deviceListJson) => {this.zone.run(()=>{this.onSppDevicesDiscovered(deviceListJson)})},
            onBleDevicesDiscovered: (deviceListJson) => {this.zone.run(()=>{this.onBleDevicesDiscovered(deviceListJson)})},
            
            onPairingSuccess: (devInfoJson)=>{this.zone.run(()=>{this.onPairingSuccess(devInfoJson)})},
            onPairingFailed: (devInfoJson)=>{this.zone.run(()=>{this.onPairingFailed(devInfoJson)})},

            onSppDeviceNotPairedForConnect: (devInfoJson)=>{this.zone.run(()=>{this.onSppDeviceNotPairedForConnect(devInfoJson)})},

            onSppVitalConnected: (devInfoJson)=>{this.zone.run(()=>{this.onSppVitalConnected(devInfoJson)})},
            onBleVitalConnected: (devInfoJson)=>{this.zone.run(()=>{this.onBleVitalConnected(devInfoJson)})},

            setVitalReadingMiniMesg: (text)=>{this.zone.run(()=>{this.setVitalReadingMiniMesg(text)})},

            onVitalReadingFinished: (vitalType, finalReadingMesg)=>{this.zone.run(()=>{this.onVitalReadingFinished(vitalType, finalReadingMesg)})},

            onVitalReadingError: (vitalType, errorMesg)=>{this.zone.run(()=>{this.onVitalReadingError(vitalType, errorMesg)})},
            onVitalReadingTimeout: (vitalType)=>{this.zone.run(()=>{this.onVitalReadingTimeout(vitalType)})},
            
        };  

        if(typeof JV_SharedPreferences == "undefined") {
            this.patientProfile = {
                        accessToken: "Pz-Na5iFDwlTP0KPSCZDP-GJvu8yeUmM",
                        auth0IdToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9FTTNPREZHT0RNeU5EbERNMFZHUXpRd1FUUkZSVVExUmtSRE5EQXdOMFV4UWtJMlJVUkZSUSJ9.eyJlbWFpbCI6InFibGFic3Rlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vcXViaXRtZWQuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE2NDU2ODg5ODMyOTkwODgzNDU4IiwiYXVkIjoiY1VWMTNzRGJrT0NRRnVobzU4MGtoOTRJRWNNZVVpMzAiLCJpYXQiOjE1MTM4NDEzMzcsImV4cCI6MTUxNDcwNTMzN30.hAYt-x4UEX0oTjgc1x3XaUAjO4DgxNChy0KAnQ57PaGd7p5Uj60Cugj-Z30YW-GDExssQgdQLjo0sH-YgoVdGoIDXAVmS2xbzjcyEVdgGVToN5JpRYHjavgDQ23ySYvD56Rd735gOOtZ7bsPJjJEi2pBZbrH8c3_PUteOiYHzutbTa8Smy2hcJH_0o-dGXMNSS-XKYMdbOgA34zIb0vr77rmGFwnbmPvtrjVrnfmGQBeD1PD-ZGwrvYRWSkb9UMWdGABB957w21U2__wMVyYcdi8TgH_CsClVJ_DjXAgp53u2eFiNI2Q4SliDJEYV9WZkwJ5zLnzjh9N8EabWx2F_w",
                        auth0UserId: "google-oauth2|116456889832990883458",
                        email: "qblabstest@gmail.com",
                        fname: "MW",
                        fullName: "MW Test",
                        lname: "Test",
                        pictureUrl: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
                  };
            this.auth0Headers = {authorization: "Bearer " + this.patientProfile.auth0IdToken};
        }
        else {
          this.patientProfile = JSON.parse(JV_SharedPreferences.getString(SP.PREF_KEY_PATIENT_PROFILE));
          this.auth0Headers = {authorization: "Bearer " + this.patientProfile.auth0IdToken};
          console.log()
        }



        this.doctorsEVisitInfoList = [
            {name: "dr  1", picture:this.tempPictureUrl},
            {name: "dr  2", picture:this.tempPictureUrl},
            {name: "dr  3", picture:this.tempPictureUrl},
            {name: "dr  4", picture:this.tempPictureUrl},
            {name: "dr  5", picture:this.tempPictureUrl},
            {name: "dr  6", picture:this.tempPictureUrl},
            {name: "dr  7", picture:this.tempPictureUrl},
            {name: "dr  8", picture:this.tempPictureUrl},
            {name: "dr  9", picture:this.tempPictureUrl},
            {name: "dr 10", picture:this.tempPictureUrl}
        ];
  }


  ngOnInit() {

  }


  ngAfterViewInit() {

    this.mainAppReferenceStr = this.sharedService.generateRandomString("ref_", 10);
    console.log("app ref: " + this.mainAppReferenceStr);

    window[this.mainAppReferenceStr] = this;
    this.javaCallService.setMainAppReferenceStr(this.mainAppReferenceStr);

    let tvTdWidth = this.tvTd.nativeElement.clientWidth;
    let tvTdHeight = this.tvTd.nativeElement.clientHeight;

    var tvDivWidth = (0.95 * tvTdWidth);
    var tvDivHeight = (0.78 * tvTdHeight);

    this.tvTopDiv.nativeElement.style.width = tvDivWidth + "px";
    this.tvTopDiv.nativeElement.style.height = tvDivHeight + "px";

    this.tvMesgDiv.nativeElement.style.width = tvDivWidth + "px";
    this.tvMesgDiv.nativeElement.style.height = (tvTdHeight * 0.09) + "px";

    this.tvWidth = tvDivWidth;
    this.tvHeight = tvDivHeight;

    this.instImgWidth = this.tvWidth * 0.7;
    this.instImgHeight = this.tvHeight * 0.7;

    this.URL_VITAL_CHARTS = this.SERVER_BASE_URL + "/vitals/charts/mobile?token=" + this.patientProfile.auth0IdToken+"&patientId="+this.patientProfile.auth0UserId;

    this.runningCheckupBool = false;
    this.takingReadingBool = false;

    setTimeout(()=>{
      this.initHome();
    }, 1000);

    setTimeout(()=>{

      //this.testEcg();

    }, 5000);

  }

  /*testEcg() {

    this.takingReadingBool = true;
    this.currVitalType = this.sharedService.VITAL_TYPE_ECG;
    this.currVitalReadingView = this.VITAL_VIEW_CONNECTED;

    JV_BTReadings.testEcg();
  }*/


  instImgWidth = 0;
  instImgHeight = 0;

  lookingUpDoctorsBool = false;

  closeApp() {
    JV_BTReadings.closeApp();
  }
  
  initHome() {

    window[this.mainAppReferenceStr] = this;
    this.javaCallService.setMainAppReferenceStr(this.mainAppReferenceStr);

    console.log("initializing HOME");
    this.setMainMessage("Welcome to mCare");
    this.currTvView = this.TV_VIEW_HOME;
    this.lookingUpDoctorsBool = false;
    this.takingReadingBool = false;
    this.setCancelledAtTimestamp();
    //this.recentlyCancelledEVisit = false; // bad idea ...
  }

  private dummy(args) {
    
  }


  private setStartedAtTimestamp() {
    console.log("typeof JV_BTReadings: ", typeof JV_BTReadings);
    if(typeof JV_BTReadings != "undefined")
      this.lastOperationStartedAt = this.getCurrentTimestamp();
    console.log("major operation started at: " + this.lastOperationStartedAt);
    if(typeof JV_BTReadings != "undefined")
      JV_BTReadings.setLastOperationStartedAt(this.lastOperationStartedAt);
  }
 
  private setCancelledAtTimestamp() {
    console.log("typeof JV_BTReadings: ", typeof JV_BTReadings);
    if(typeof JV_BTReadings != "undefined")
      this.lastOperationCancelledAt = this.getCurrentTimestamp();
    console.log("major operation cancelled at: " + this.lastOperationCancelledAt);
    console.log("typeof JV_BTReadings: ", typeof JV_BTReadings);
    if(typeof JV_BTReadings != "undefined")
      JV_BTReadings.setLastOperationCancelledAt(this.lastOperationCancelledAt);
  }


  public setMainMessage(mesg:string) {
    console.log("Setting Main Message: " + mesg);
    this.mainTvMessage = mesg;
  }


  private showTempTvMessage (mesg:string) {
    if(typeof this.tvMessageTimeoutId != "undefined")
      clearTimeout(this.tvMessageTimeoutId);

    this.setMainMessage(mesg);
    this.tvMessageTimeoutId = setTimeout(()=>{
      this.setMainMessage("");
    }, 3000);
  }


  private speak(mesg:string) {
    console.log("Speaking TTS: '" + mesg + "'");
    JV_BTReadings.speak(mesg);
  }


  //////// CHF CHECKUP ////////////////////
  runningCheckupBool = false;
  private runChfCheckup() {
    this.runningCheckupBool = true;
    this.currTvView = this.TV_VIEW_CHECKUP;
  }



  ////////////// EVISIT ////////////////////

  tempPictureUrl = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
  doctorsEVisitInfoList = [];
  doctorsProfileList = [];

  SERVER_BASE_URL = this.sharedService.SERVER_BASE_URL;
  URL_GET_USER_PROFILE = this.SERVER_BASE_URL + "/auth0/user";
  URL_GET_DRCHRONO_DOCTOR_PROFILE = this.SERVER_BASE_URL + "/doctor/profile";

  URL_GET_ONLINE_DOCTORS_LIST = this.SERVER_BASE_URL + "/evisit/patient/online_doctors";
  URL_POST_PATIENT_ENQUEUE = this.SERVER_BASE_URL + "/evisit/patient/enqueue";
  URL_GET_HAS_EVISIT_BEGUN = this.SERVER_BASE_URL + "/evisit/patient/has_doctor_let_me_in";
  URL_GET_EVISIT_STATE = this.SERVER_BASE_URL + "/evisit/state";
  URL_VITAL_CHARTS = "";



  private initEVisitState():void {

    this.eVisitState = {
      IN_AN_EVISIT: false,
      currDoctorProfile: {},
      currEvisitId: "",
      currOpentokToken: "",
      currOpentokSessionId: "",
      currOpentokApiKey: ""
    }
  }


  private async getUserProfileByUserId(userId, callback) {
    this.sharedService.ajaxGetCall(this.URL_GET_USER_PROFILE+"?user_id="+encodeURI(userId), this.auth0Headers, (response)=>{
      callback(response.body);
    });
  }


  private async getDoctorProfileByUserId(userId, callback) {
    this.sharedService.ajaxGetCall(this.URL_GET_DRCHRONO_DOCTOR_PROFILE+"?doc_id="+encodeURI(userId), this.auth0Headers, (response)=>{
      callback(response.body);
    });
  }

  // async placeIn(corrIndex, userId, populateDocInfoList) {
  //   var docInfo;// get from ajax call
  //   this.sharedService.ajaxGetCall(this.URL_GET_USER_PROFILE+"?user_id="+encodeURI(userId), this.auth0Headers, (response)=>{
  //     var docInfo = JSON.parse(response.body);
  //     populateDocInfoList(corrIndex, docInfo);
  //   });


  // }


  evisitIFrameUrl = "about:blank";
  fetchingListCompleteBool = false;

  private findDoctors():void {

    this.setStartedAtTimestamp();

    this.lookingUpDoctorsBool = true;
    this.fetchingListCompleteBool = false;
    this.changeRef.detectChanges();

    if(this.takingReadingBool) {
      this.snackBar.open("Currently Taking a reading ... ", "", {duration: 2000});
    }

    $(".tv-div-div").css("width", this.tvWidth + "px");
    $(".tv-div-div").css("height", (0.85*this.tvHeight) + "px");
    $(".tv-div-div").css("overflow", "auto");

    this.mainTvMessage = "Finding Doctors ... ";
    this.currTvView = this.TV_VIEW_EVISIT_FETCHING_ONLINE_DOCTORS;
    this.doctorsProfileList = [];
    this.doctorsEVisitInfoList = [];

    //console.log(this.URL_GET_DOCTORS_LIST + ", ", this.auth0Headers);

    this.sharedService.ajaxGetCall(this.URL_GET_ONLINE_DOCTORS_LIST, this.auth0Headers, (response)=>{

      if(this.lastOperationCancelledAt > this.lastOperationStartedAt) {
        console.log("Recently Cancelled EVisit. Ignoring Response for finding Doctors");
        return;
      }

      this.fetchingListCompleteBool = true;
      this.changeRef.detectChanges();

      console.log(response);

      this.doctorsEVisitInfoList = JSON.parse(response.body);

      var i = 0;
      this.doctorsEVisitInfoList.forEach((item)=>{
        var docId = encodeURI(item.doc_id);
        const position = i;
        this.getDocProfileAndAddToListAt(position, docId);
        i++;
      });

      console.log(this.doctorsEVisitInfoList);
      this.mainTvMessage = "Doctor's List Ready";
      this.currTvView = this.TV_VIEW_EVISIT_ONLINE_DOCTORS_LIST_READY;

      if(this.doctorsEVisitInfoList.length == 0) {
        //this.snackBar.open("No Doctors Online Right Now. Please Try Again Later ... ","", {duration: 3000});
        setTimeout(async ()=>{
          this.initHome();
        }, 4000);
        return;
      }

    }, (error)=>{
      console.log("Error: ", error);
      this.fetchingListCompleteBool = true;
    });

  }
 
  private async getDocProfileAndAddToListAt(position, docId) {

    console.log("Getting user profile for " + docId + " for position " + position);
    if(docId.includes("drchrono")) {
      this.getDoctorProfileByUserId(docId, (profile)=>{

        var profileJson = JSON.parse(profile)[0];

        console.log("User Profile for ", docId, profile);

        if(this.lastOperationCancelledAt > this.lastOperationStartedAt) {
          console.log("Recently Cancelled EVisit. Ignoring adding profile to online doc profile list");
          
          return;
        }
        profileJson.doc_id = profileJson.drchrono_doc_id;
        this.addDocProfileToList(position, profileJson);
      });
    }
    else {
      this.getUserProfileByUserId(docId, (profileJsonStr)=>{

        console.log("User Profile for ", docId, profileJsonStr);
        var profileJson = JSON.parse(profileJsonStr);
        

        if(this.lastOperationCancelledAt > this.lastOperationStartedAt) {
          console.log("Recently Cancelled EVisit. Ignoring adding profile to online doc profile list");
          
          return;
        }
        
        profileJson.full_name = profileJson.name;
        profileJson.doc_id = profileJson.user_id;
        this.addDocProfileToList(position, profileJson);
      });
    }
    
  }

  private addDocProfileToList(i, docInfo) {
    console.log("placing doctor profile at position: " + i + " ... ", docInfo)
    //this.doctorsProfileList[i] = docInfo;
    console.log(docInfo);
    this.doctorsProfileList.push(docInfo);
  }; 


  private enqueueToThisDoctor(requestedDocProfile) {

    console.log("Setting State: IN_AN_EVISIT");
    this.eVisitState.IN_AN_EVISIT = true;
    this.eVisitState.currDoctorProfile = requestedDocProfile;

    console.log("requesting doctor profile: ", requestedDocProfile);

    this.mainTvMessage = "Requesting Doctor " + requestedDocProfile.full_name;
    this.currTvView = this.TV_VIEW_EVISIT_REQUESTING_LIST_READY;

    // changed to adapt for drchrono
    //var data = {doc_id: requestedDocProfile.user_id};
    var data = {doc_id: requestedDocProfile.doc_id};
    console.log("Data: ", data);

    this.sharedService.ajaxPostCall(this.URL_POST_PATIENT_ENQUEUE, data, this.auth0Headers, (response)=>{

      if(this.lastOperationCancelledAt > this.lastOperationStartedAt) {
        console.log("Recently Cancelled EVisit. Ignoring Response For Enqueuing");
        return;
      }

      console.log(response.body);

      // enqueued success
      if(response.body.includes("SUCCESS")) {
        var evisitId = response.body.split("^^")[1];
        this.eVisitState.currEvisitId = evisitId;
        console.log("EvisitId: " + evisitId);
        this.waitForDoctorToLetMeIn(requestedDocProfile, evisitId);
      }
      else if(response.body.includes("ALREADY_ENQUEUED")) {
        var evisitId = response.body.split("^^")[1];
        this.eVisitState.currEvisitId = evisitId;
        console.log("EvisitId: " + evisitId);
        this.waitForDoctorToLetMeIn(requestedDocProfile, evisitId);
      }
      else {
        // TODO
      }

    });
  }

  // TODO: OBSOLOETE
  /*enterDoctorsOffice(requestedDocProfile) {

    /\*var docProfile:any = this.doctorsProfileList.filter((item)=>{
        console.log("Comparing .. " + item.user_id + " with " + requestedDocProfile.user_id);
        return item.user_id == requestedDocProfile.user_id;
    });*\/

    this.tvMessage = "In Doctor's Office: " + requestedDocProfile.name;
    this.currTvView = this.TV_VIEW_EVISIT_ENTERING_DOCTORS_OFFICE;

    this.waitForDoctorToLetMeIn(requestedDocProfile);
  }*/




    // setTimeout(()=>{
    //   this.currTvView = this.TV_VIEW_IN_WAITING_ROOM;

    //   setTimeout(()=>{

    //     this.currTvView = this.TV_VIEW_NEXT_PATIENT;

    //     setTimeout(()=>{

    //       this.currTvView = "";

    //       this.enterEVisit("");


    //     }, 5000);

    //   }, 5000);

    // }, 5000);
  //}


  waitingInterval;
  currEvisitPosition = -1;

  private waitForDoctorToLetMeIn(requestedDocProfile, evisitId) {
    this.currEvisitPosition = -1;
    this.hasDoctorToLetMeIn(requestedDocProfile, evisitId);
    this.waitingInterval = setInterval(()=>{
      this.hasDoctorToLetMeIn(requestedDocProfile, evisitId);
    }, 10000);
  }


  private async hasDoctorToLetMeIn(requestedDocProfile, evisitId) {

      console.log(requestedDocProfile);
      this.mainTvMessage = "In Live Session with Doctor: " + requestedDocProfile.name;
      this.currTvView = this.TV_VIEW_EVISIT_IN_WAITING_ROOM;

      //let docId = encodeURI(requestedDocProfile.user_id);
      let docId = encodeURI(requestedDocProfile.doc_id);

      this.sharedService.ajaxGetCall(this.URL_GET_HAS_EVISIT_BEGUN + "?evisit_id=" + evisitId + "&doc_id=" + docId, this.auth0Headers, (response)=>{

        if(this.lastOperationCancelledAt > this.lastOperationStartedAt) {
          console.log("Recently Cancelled EVisit. Ignoring Response for checking if doctor has let me in");
          return;
        }

        if(response.body.includes("IN_SESSION")) {


          let responseParts = response.body.split("^^");

          let opentokSessionId = decodeURIComponent(responseParts[1]);
          let opentokToken = decodeURIComponent(responseParts[2]);
          let opentokApiKey = decodeURIComponent(responseParts[3]);

          this.eVisitState.currOpentokSessionId = opentokSessionId;
          this.eVisitState.currOpentokToken = opentokToken;
          this.eVisitState.currOpentokApiKey = opentokApiKey;
          

          console.log("Clearing Interval for: check if doc has let me in");
          console.log(this.eVisitState);
          clearInterval(this.waitingInterval);

          this.enterEVisit(opentokApiKey, opentokSessionId, opentokToken);
        }
        else if(response.body.includes("NOPE")){
          let responseParts = response.body.split("^^");
          this.currEvisitPosition = parseInt(responseParts[1]);
        }

      });
  }


  private cancelEVisit() {
    /*
    this.evisitIFrameUrl = "about:blank";
    this.recentlyCancelledEVisit = true;
    this.eVisitState.IN_AN_EVISIT = false;
    this.initHome();
    */
    this.resetEverything();
  }

  private resetEverything() {
    this.setCancelledAtTimestamp();
    setTimeout(()=>{
      location.reload();
    }, 500);
    
  }

  private enterEVisit(opentokApiKey, opentokSessionId, opentokToken) {
    this.currTvView = this.TV_VIEW_EVISIT_IN_SESSION;    


    this.evisitIFrameUrl = this.sharedService.getOpenTokUrl(opentokApiKey, opentokSessionId, opentokToken, this.tvWidth, this.tvHeight);
                  
    setTimeout(()=>{
      $(this.evisitIFrame.nativeElement).attr("src", this.evisitIFrameUrl);
      $(this.evisitIFrame.nativeElement).attr("width", this.tvWidth);
      $(this.evisitIFrame.nativeElement).attr("height", this.tvHeight);

      this.evisitIFrame.nativeElement.style.width = this.tvWidth;
      this.evisitIFrame.nativeElement.style.height = this.tvHeight;
    }, 2000);
    
    this.evisitCompletedPolling();
  }

  evisitPollingInterval;
  private evisitCompletedPolling() {

    this.evisitPollingInterval = setInterval(()=>{

      let evisitId = this.eVisitState.currEvisitId;
      console.log("Checking if evisit ended for evisitId: " + evisitId);

      if(this.eVisitState.currEvisitId == "") {
        console.log("evisitid empty");
        return;
      }

      this.sharedService.ajaxGetCall(this.URL_GET_EVISIT_STATE + "?evisit_id=" + evisitId, this.auth0Headers, (response)=>{

        if(this.lastOperationCancelledAt > this.lastOperationStartedAt) {
          console.log("Recently Cancelled EVisit. Ignoring Response For checking evisit completed!");
          return;
        }

        if(!response.body.includes("IN_SESSION")) {
          console.log("Not In session anymore!");
          clearInterval(this.evisitPollingInterval);

          this.onEvisitEnded();
        }

      });

    }, 10000);
  }

  private onEvisitEnded() {

    console.log("Evisit ended!");

    this.evisitIFrameUrl = "about:blank";

    this.initEVisitState();

    this.resetEverything();

  }

  public toastThis(str:string) {
    console.log("Toasting: " + str);
    this.snackBar.open(str, '', {duration: 2000});
  }



  // VITAL READINGS .... 


  takingReadingBool = false;
  currVitalType = this.sharedService.VITAL_TYPE_NONE;

  VITAL_STATE_INIT = 100;
	VITAL_STATE_WAITING_FOR_CONNECTION = 101;
	VITAL_STATE_CONNECTED = 102;
	VITAL_STATE_READING_FINISHED = 103;
	VITAL_STATE_ERROR_DISCONNECTED = 111;
	BT_INST_4 = 104;
	BT_TIMEOUT = 110;
	VITAL_STATE_FINISHED = this.VITAL_STATE_INIT;
	BT_404 = 404; // vitalDeviceInfo not found

  VITAL_VIEW_CHECKING_REGISTRATION = "VITAL_VIEW_CHECKING_REGISTRATION";
  VITAL_VIEW_NOT_REGISTERED = "VITAL_VIEW_NOT_REGISTERED";
  VITAL_VIEW_BT_PAIRING_LOOKUP = "VITAL_VIEW_BT_PAIRING_LOOKUP";
  VITAL_VIEW_BT_SPP_DEVICES_FOUND = "VITAL_VIEW_BT_PAIRING_DEVICES_FOUND";
  VITAL_VIEW_BT_BLE_DEVICES_FOUND = "VITAL_VIEW_BT_BLE_DEVICES_FOUND";
  VITAL_VIEW_BT_PAIRING_ATTEMPT = "VITAL_VIEW_BT_PAIRING_ATTEMPT";
  VITAL_VIEW_BT_PAIRING_FAILED = "VITAL_VIEW_BT_PAIRING_FAILED";
  VITAL_VIEW_BT_PAIRING_SUCCESS = "VITAL_VIEW_BT_PAIRING_SUCCESS";
  VITAL_VIEW_BT_REGISTERING = "VITAL_VIEW_BT_REGISTERING";
  VITAL_VIEW_BT_REGISTERED = "VITAL_VIEW_BT_REGISTERED";

  VITAL_VIEW_CONNECTING = "VITAL_VIEW_SPP_CONNECTING";
  VITAL_VIEW_SPP_NOT_PAIRED = "VITAL_VIEW_SPP_NOT_PAIRED";
  VITAL_VIEW_CONNECTED = "VITAL_VIEW_SPP_CONNECTED";
  VITAL_VIEW_FINISHED = "VITAL_VIEW_FINISHED";
  VITAL_VIEW_FINISHED_SHOW_FINAL_READING = "VITAL_VIEW_FINISHED_SHOW_FINAL_READING";
  VITAL_VIEW_TIMEOUT = "VITAL_VIEW_TIMEOUT";
  VITAL_VIEW_ERROR = "VITAL_VIEW_ERROR";

  currVitalReadingView = this.VITAL_VIEW_CHECKING_REGISTRATION;
  currVitalDeviceModelInfo;
  currMiniMessage = "";
  

  private takeReading(vital):void {

    if(this.takingReadingBool) {
      this.snackBar.open("Currently Taking " + this.sharedService.getVitalStr(this.currVitalType) + ". Please Wait ... ", "", {duration: 2000});
      return;
    }

    this.takingReadingBool = true;
    this.currVitalType = vital;

    switch(vital) {
      case this.sharedService.VITAL_TYPE_SUGAR:
        console.log("Setting device info ... " + this.sharedService.getVitalStr(vital));
        this.currVitalDeviceModelInfo = this.deviceListService.foraSugarTestNGoDeviceInfo;
        break;
      case this.sharedService.VITAL_TYPE_SPO2:
        console.log("Setting device info ... " + this.sharedService.getVitalStr(vital));
        //this.currVitalDeviceModelInfo = this.deviceListService.noninDeviceInfo;
        this.currVitalDeviceModelInfo = this.deviceListService.innovoSpo2BluetoothDeviceInfo;
        break;
      case this.sharedService.VITAL_TYPE_BP:
        console.log("Setting device info ... " + this.sharedService.getVitalStr(vital));
        //this.currVitalDeviceModelInfo = this.deviceListService.pyleBloodPressureDeviceInfo;
        this.currVitalDeviceModelInfo = this.deviceListService.andBpUa651DeviceInfo
        break;
      case this.sharedService.VITAL_TYPE_WEIGHT:
        console.log("Setting device info ... " + this.sharedService.getVitalStr(vital));
        //this.currVitalDeviceModelInfo = this.deviceListService.pyleWeighingScaleDeviceInfo;
        this.currVitalDeviceModelInfo = this.deviceListService.andWeightUa651DeviceInfo;
        break;
      case this.sharedService.VITAL_TYPE_ECG:
        console.log("Setting device info ... " + this.sharedService.getVitalStr(vital));
        this.currVitalDeviceModelInfo = this.deviceListService.faros360EcgDeviceInfo;
        break;
      default:
        console.log("Vital not valid. Doing nothing.");
        this.takingReadingBool = false;
        this.currVitalType = this.sharedService.VITAL_TYPE_NONE;
        return;
    }

    this.changeRef.detectChanges();
    this.setStartedAtTimestamp();
    this.checkDeviceRegistration();
  }
  
  private getCurrentTimestamp() {
    return this.sharedService.getCurrentTimestamp();
  }

  // checking this value all operations will cancel in the underlying java layer
  private cancelBtOperation() {
    this.setCancelledAtTimestamp();
  }

  currRegisteredDeviceInfo;

  private checkDeviceRegistration() {

    this.currRegisteredDeviceInfo = undefined;

    this.currVitalReadingView = this.VITAL_VIEW_CHECKING_REGISTRATION;
    
    let regVital = this.getRegisteredDeviceInfo(this.currVitalType);
    console.log(typeof regVital + " ... ", regVital);

    if(regVital == "" || typeof regVital == "undefined" || regVital == "undefined") {
      console.log("Device NOT Registered ... ");
      this.currVitalReadingView = this.VITAL_VIEW_NOT_REGISTERED;
    }
    else 
    {
      console.log("Device Already Registered ... ", regVital);
      let regVitalJson = JSON.parse(regVital);
      let btMac = regVitalJson.mac;
      let btName = regVitalJson.btname;

      if(typeof btMac == "undefined") {
        console.log("... but mac Undefined ... unregistering");
        this.unregisterDevice(this.currVitalType);
        this.currVitalReadingView = this.VITAL_VIEW_NOT_REGISTERED;
        return;
      }

      console.log("currVitalDeviceInfo: ", this.currVitalDeviceModelInfo);

      let currDeviceModelInfo = this.currVitalDeviceModelInfo;
      let currDeviceCommType = currDeviceModelInfo.di_device_comm.comm_type;
      let currDevicePairingNeeded = currDeviceModelInfo.di_device_comm.di_comm_info.di_pairing_info.pairing_needed;

      if(currDevicePairingNeeded) {      

        if(!JV_BTReadings.isBtDevicePaired(btMac)) {
          console.log("... but not paired ... unregistering");
          this.unregisterDevice(this.currVitalType);
          this.currVitalReadingView = this.VITAL_VIEW_NOT_REGISTERED;
          this.currRegisteredDeviceInfo = undefined;
          return;
        }
      }

      this.currRegisteredDeviceInfo = regVitalJson;

      this.connectToCurrDevice();
    }
  }

  private cancelRegistration() {
    console.log("Cancelling Registration of New Device.");
    this.cancelBtOperation();
    //this.resetEverything();

    this.takingReadingBool = false;
    this.currTvView = this.TV_VIEW_HOME;
    this.currVitalReadingView = this.VITAL_VIEW_CHECKING_REGISTRATION;;
  }



  public setVitalReadingMiniMesg(mesg:string) {
    this.vitalReadingMiniMesg = mesg;
  }
  
  devicesDiscovered = [];

  private lookupDevices(devModelInfo) {

    console.log(devModelInfo);
    let btNamePrefix = devModelInfo.di_device_comm.di_comm_info.bt_name;
    console.log("Looking up " + btNamePrefix);

    this.devicesDiscovered = [];
    this.currVitalReadingView = this.VITAL_VIEW_BT_PAIRING_LOOKUP;

    let currDeviceModelInfo = this.currVitalDeviceModelInfo;
    let currDeviceCommType = currDeviceModelInfo.di_device_comm.comm_type;
    let currDevicePairingNeeded = currDeviceModelInfo.di_device_comm.di_comm_info.di_pairing_info.pairing_needed;

    
    
    if(currDeviceCommType == "BT_SPP") {
      
      console.log("PAIRING NEEDED ... ");
      JV_BTReadings.discoverBtDevices(btNamePrefix);
    }
    else if(currDeviceCommType == "BT_LE") {

      if(currDevicePairingNeeded) {
        console.log("PAIRING NEEDED ... ");
        JV_BTReadings.discoverBtDevices(btNamePrefix);
      }
      else {
        console.log("PAIRING NOT NEEDED ... ");
        JV_BTReadings.scanBleDevices(btNamePrefix);
      }
      
    }
    
    else if(currDeviceCommType == "NFC") {

    }

  }

  
  private onSppDevicesDiscovered(deviceList) {

    console.log("Devices Discovered: ", deviceList);
    this.devicesDiscovered = deviceList;
    this.currVitalReadingView = this.VITAL_VIEW_BT_SPP_DEVICES_FOUND;
  }

  // BLE METHODS
  private onBleDevicesDiscovered(deviceList) {
    console.log("BLE Devices Discovered: ", deviceList);
    this.devicesDiscovered = deviceList;
    this.currVitalReadingView = this.VITAL_VIEW_BT_BLE_DEVICES_FOUND;

  }

  private createBluetoothBond(devInfo) {

    console.log("Pairing with device: ", devInfo);

    if(devInfo.paired) {
      console.log("Already Paired. Registering ... ", devInfo);
      this.registerDevice(devInfo);
      return;
    }

    this.currVitalReadingView = this.VITAL_VIEW_BT_PAIRING_ATTEMPT;

    let mac = devInfo.mac;
    let btname = devInfo.btname;
    let pin = this.deviceListService.getPairingPinFor(devInfo.btname);
    JV_BTReadings.pairWithThisDevice(btname, mac, pin);
  }

  private onPairingFailed(devInfoJson) {

    this.currVitalReadingView = this.VITAL_VIEW_BT_PAIRING_FAILED;

    console.log("Pairing Failed ... ", devInfoJson);
  }


  private onPairingSuccess(devInfoJson) {

    this.currVitalReadingView = this.VITAL_VIEW_BT_PAIRING_SUCCESS;

    console.log("Pairing Succeeded! ", devInfoJson);
    this.registerDevice(devInfoJson);
  }


  private registerDevice(devInfo) {

    this.currVitalReadingView = this.VITAL_VIEW_BT_REGISTERING;

    console.log("Registering Device: ", devInfo);
    this.saveRegistrationDeviceInfo(this.currVitalType, JSON.stringify(devInfo));
    console.log("From pref:" + this.getRegisteredDeviceInfo(this.currVitalType));

    this.currRegisteredDeviceInfo = devInfo;
 
    setTimeout(()=>{
      this.currVitalReadingView = this.VITAL_VIEW_BT_REGISTERED;

      setTimeout(()=>{
        this.resetEverything();
      }, 2000);
    }, 1000);
  }
  

  private unregisterDevice(vitalType) {
    this.saveRegistrationDeviceInfo(vitalType, "");
  } 

  private getRegisteredDeviceInfo(vitalType) {
    return JV_SharedPreferences.getString("REG_VITAL_"+this.currVitalType);
  }

  private saveRegistrationDeviceInfo(vitalType, vitalDevInfoJsonStr) {
    JV_SharedPreferences.setString("REG_VITAL_"+this.currVitalType, vitalDevInfoJsonStr)
  }

  private connectToCurrDevice() {

    console.log("currVitalDeviceInfo: ", this.currVitalDeviceModelInfo);

    this.setVitalReadingMiniMesg("");

    let currDeviceModelInfo = this.currVitalDeviceModelInfo;
    let currDeviceCommType = currDeviceModelInfo.di_device_comm.comm_type;

    if(currDeviceCommType == "BT_SPP") {
        let mac = this.currRegisteredDeviceInfo.mac;
        let btname = this.currRegisteredDeviceInfo.btname;
        console.log("Connecting to Device: " + mac + " (" + btname + ")");

        this.connectToSppDevice(mac, btname);
    }
    else if(currDeviceCommType == "BT_LE") {
        let mac = this.currRegisteredDeviceInfo.mac;
        let btname = this.currRegisteredDeviceInfo.btname;
        console.log("Connecting to Device: " + mac + " (" + btname + ")");

        this.connectToBleDevice(mac, btname);
    }

  }


  currInstructionImageUrl = "";
  private connectToSppDevice(mac, btname) {

    console.log("Connecting to SPP Device " + btname + " (" + mac + ")");

    let currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter((item)=>
    {
      return item.di_usage_instruction.at == "WAITING_FOR_CONNECTION";
    })[0];
    console.log("Curr WAITING_FOR_CONNECTION Instruction: ", currInstruction);

    this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
    console.log("Curr Instruction Image: " + this.currInstructionImageUrl);

    this.currVitalReadingView = this.VITAL_VIEW_CONNECTING;
    this.setMainMessage(currInstruction.di_usage_instruction.text);
    this.speak(currInstruction.di_usage_instruction.voice);

    this.changeRef.detectChanges();
    setTimeout(()=> {
      JV_BTReadings.connectToSppDevice(mac, btname, this.currVitalType);
    }, 100);
    
  }

  private connectToBleDevice(mac, btname) {

    console.log("Connecting to BLE Device " + btname + " (" + mac + ")");

    let currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter((item)=>
    {
      return item.di_usage_instruction.at == "WAITING_FOR_CONNECTION";
    })[0];
    console.log("Curr WAITING_FOR_CONNECTION Instruction: ", currInstruction);

    this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
    console.log("Curr Instruction Image: " + this.currInstructionImageUrl);

    this.currVitalReadingView = this.VITAL_VIEW_CONNECTING;
    this.setMainMessage(currInstruction.di_usage_instruction.text);
    this.speak(currInstruction.di_usage_instruction.voice);

    this.changeRef.detectChanges();
    setTimeout(()=> {
      JV_BTReadings.connectToBleDevice(mac, btname, this.currVitalType);
    }, 100);
    
  }

  private onSppDeviceNotPairedForConnect(devInfo) {

    console.log("Connected to Device: " + devInfo.mac + " (" + devInfo.btname + ")");
    this.currVitalReadingView = this.VITAL_VIEW_SPP_NOT_PAIRED;

    this.setMainMessage("Unregistering Device ... ");

    this.unregisterDevice(this.currVitalType);

    this.setMainMessage("Device Unregistered!");

    this.lookupDevices(this.currVitalDeviceModelInfo);

    return;
  }

  private onSppVitalConnected(devInfo) {

    console.log("Connected to Device: " + devInfo.mac + " (" + devInfo.btname + ")");

    let currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter((item)=>
    {
      return item.di_usage_instruction.at == "CONNECTED";
    })[0];
    console.log("Curr CONNECTED Instruction: ", currInstruction);

    this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
    console.log("Curr Instruction Image: " + this.currInstructionImageUrl);

    this.currVitalReadingView = this.VITAL_VIEW_CONNECTED;

    this.setMainMessage(currInstruction.di_usage_instruction.text);
    this.speak(currInstruction.di_usage_instruction.voice);

    this.changeRef.detectChanges();
  }


  private onBleVitalConnected(devInfo) {

    console.log("Connected to Device: " + devInfo.mac + " (" + devInfo.btname + ")");

    let currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter((item)=>
    {
      return item.di_usage_instruction.at == "CONNECTED";
    })[0];
    console.log("Curr CONNECTED Instruction: ", currInstruction);

    this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
    console.log("Curr Instruction Image: " + this.currInstructionImageUrl);

    this.currVitalReadingView = this.VITAL_VIEW_CONNECTED;

    this.setMainMessage(currInstruction.di_usage_instruction.text);
    this.speak(currInstruction.di_usage_instruction.voice);

    this.changeRef.detectChanges();
  }


  finalReadingMesg = "";
  private onVitalReadingFinished(vitalType, finalReadingMesg) {

    this.finalReadingMesg = finalReadingMesg;

    let currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter((item)=>
    {
      return item.di_usage_instruction.at == "FINISHED";
    })[0];

    console.log("Curr FINISHED Instruction: ", currInstruction);
    console.log("finalReadingMesg: " + this.finalReadingMesg);

    this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
    console.log("Curr Instruction Image: " + this.currInstructionImageUrl);

    this.setMainMessage(currInstruction.di_usage_instruction.text);
    this.speak(currInstruction.di_usage_instruction.voice);

    this.currVitalReadingView = this.VITAL_VIEW_FINISHED;


    setTimeout(()=>{

      this.currVitalReadingView = this.VITAL_VIEW_FINISHED_SHOW_FINAL_READING;

          setTimeout(() => {
                  this.takingReadingBool = false;

                  if(!this.eVisitState.IN_AN_EVISIT) {
                    this.initHome();
                  }
                  else {
                    // TODO: here
                  }

          }, 7000);      

    }, 5000);

  }

  private onVitalReadingTimeout(vitalType) {
    this.currVitalReadingView = this.VITAL_VIEW_TIMEOUT;
    this.currErrorMesg = "Please Try Again Later";

    setTimeout(()=>{
      this.takingReadingBool = false;
      this.initHome();
    }, 5000); 
  }


  currErrorMesg = "";
  private onVitalReadingError(vitalType, errorMesg) {

    this.currVitalReadingView = this.VITAL_VIEW_ERROR;

    if(errorMesg == "DEVICE_DRIVER_NOT_FOUND") {
      this.currErrorMesg = "Device Driver Not Found";
    }
    else {
      this.currErrorMesg = "Please Try Again Later";
    }

    setTimeout(()=>{
      this.takingReadingBool = false;
      this.initHome();
    }, 5000); 
  }



    

  //////////// VIEW CHARTS ////////////////
  private viewCharts() {
    console.log("viewCharts()");
    
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 10;
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 10;
    var dialogRef = this.dialog.open(VitalChartsDialog, {
      width: w+"px",
      height: h+"px",
      disableClose: true,
      data: { charts_url: this.URL_VITAL_CHARTS }
    });
  }

  private closeCharts() {
    console.log("closeCharts()");
    
  }


  ////////////// PHOTO ////////////////////
  takingPhoto = false;
  private takePhoto() {
    console.log("takePhoto()");
    
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 10;
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 10;
    var dialogRef = this.dialog.open(PhotoDialog, {
      width: w+"px",
      height: h+"px",
      disableClose: true,
      data: { w: w, h: h}
    });
    
    dialogRef.afterOpen().subscribe(result => {
      console.log("Photo Dialog Opened");
      this.takingPhoto = true;
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log("Photo Dialog Closed");
      this.takingPhoto = false;
    });
  }


}

  







@Component({
  selector: 'vital-charts-dialog',
  template: `
    <iframe #chartsIframe [width]="w" [height]="h" [style.width]='w' [style.height]='h' [src]=""  frameborder="0" allowfullscreen="no"></iframe>
    <button mat-button color="primary" (click)='refreshCharts();'><i class="fas fa-sync"></i> <span>Refresh</span></button>
    <button mat-button color="warn" (click)='closeCharts();'><i class="fas fa-window-close"></i> <span>Close</span></button>
  `,
})
export class VitalChartsDialog {

  charts_url = "";

  w = 200;
  h = 200;

  @ViewChild("chartsIframe") chartsIframe; 

  constructor(
    public dialogRef: MatDialogRef<VitalChartsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.charts_url = data.charts_url;
      console.log("Opening " + this.charts_url);

      
  }

  ngAfterViewInit() {
    let vd = $(".mat-dialog-container");
    console.log(vd.width() + "x" + vd.height());
    this.w = Math.floor(vd.width() * 0.97);
    this.h = Math.floor(vd.height() * 0.83);

    this.charts_url = this.charts_url + "&w="+this.w+"&h="+this.h;

    this.loadCharts();
    
  }


  onNoClick(): void { 
    //this.dialogRef.close();
  }

  refreshCharts() {
    console.log("Refreshing Charts ... ");
    this.loadCharts();
  }

  loadCharts() {
    
    let iframeElement = this.chartsIframe.nativeElement;
    iframeElement.src = this.charts_url;

    console.log("Loading Charts URL: " + this.charts_url);
  }

  closeCharts() {
    this.dialogRef.close();
  }

}



 



@Component({
  selector: 'photo-dialog',
  template: `
    <style> 
      .hcenter {
        display: flex;
        align-items: center;
        justify-content: center
      }
      /*img {
        display: inline-block;
        width: auto;
      }*/
    </style>
    
    <video #captureVideo0 style='border: 0px solid #000' *ngIf="!photoCaptured" [width]="videoW" [height]="videoH" [style.width]="videoW" [style.height]="videoH" autoplay></video>   

    <!--
    <video *ngIf="currCamIndex==0" #captureVideo0 style='border: 0px solid #000' *ngIf="!photoCaptured" [width]="videoW" [height]="videoH" [style.width]="videoW" [style.height]="videoH" autoplay></video>   
    <video *ngIf="currCamIndex==1" #captureVideo1 style='border: 0px solid #000' *ngIf="!photoCaptured" [width]="videoW" [height]="videoH" [style.width]="videoW" [style.height]="videoH" autoplay></video>   
    -->
    
    <div class='hcenter' [style.width]="videoW" [style.height]="videoH">
      <img #img [style.height]="videoH" *ngIf="photoCaptured" />   
    </div>
    
    <br />

    <div class='hcenter' [style.width]="videoW">
      <button *ngIf="videoDevices.length > 1" mat-raised-button color="primary" (click)="switchCamera()">
          <i class="fas fa-sync"></i> Switch Cams
      </button> 
      &nbsp; &nbsp;
      <button *ngIf="startedVideo && !photoCaptured" mat-raised-button color="primary" (click)="clickPhoto()">
          <i class="fas fa-camera"></i> Capture
      </button> 
      &nbsp; &nbsp;
      <button *ngIf="photoCaptured" mat-raised-button color="primary" (click)="savePhoto()">
          <i class="fas fa-download"></i> Save Photo
      </button> 
      &nbsp; &nbsp;
      <button mat-raised-button color="warn" (click)="closePhoto()">
          <i class="fas fa-window-close"></i> Close
      </button>
    </div>
  `,
})
export class PhotoDialog {

  charts_url = "";

  w = 200;
  h = 200;

  videoW = 200;
  videoH = 200;

  captureW = 800;
  captureH = 600;

  startedVideo = false;
  photoCaptured = false;

  videoDevices = [];

  @ViewChild("captureVideo0") captureVideo0Element;
  //@ViewChild("captureVideo1") captureVideo1Element;

  @ViewChild("img") imgElement;

  constructor(
    public dialogRef: MatDialogRef<PhotoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.w = data.w;
      this.h = data.h - 20;

      this.videoW = this.w * 0.73;
      this.videoH = this.h * 0.75;

  }

  currCamIndex = 1;

  videoConstraints;



  onNoClick(): void { 
    //this.dialogRef.close();
  }

  ngAfterViewInit() {

    
    this.startedVideo = false;
    this.photoCaptured = false;
    this.currCamIndex = 1;

    this.videoDevices = [];

    this.getDeviceList();
  }
  

  getDeviceList() {
    navigator.mediaDevices.enumerateDevices()
      .then((devices)=>{

        this.videoDevices = devices.filter((item)=>{return item.kind === 'videoinput'});
        console.log(this.videoDevices);

        

        this.startCameraStream();
      })
      .catch((error)=>{});
  }

  getVideoElement() {
    let videoEl;

    /*
    if(this.currCamIndex == 0) {
      videoEl = this.captureVideo0Element.nativeElement;
      console.log("VideoElement0");
    }
    else {
      videoEl = this.captureVideo1Element.nativeElement;
      console.log("VideoElement1");
    }
    */

    return this.captureVideo0Element.nativeElement;
  }


  currStream;
  startCameraStream() {

    
    let camIndex = this.currCamIndex;

    let facingMode = "";

    if(this.videoDevices.length > 1) {
      if(camIndex == 0) {
        facingMode = "user";
      }
      else {
        facingMode = "environment";
      }
    }
    else {
      facingMode = "user";
    }

    

    console.log("Cam Index (setting constraints): " + camIndex);
    console.log("Cam FacingMode: " + facingMode);
    console.log("Device Selected: ", this.videoDevices[this.currCamIndex]);

    this.videoConstraints  = {
          // width: this.captureW,
          // height: this.captureH,
          frameRate: { ideal: 10, max: 15 },
          facingMode: facingMode,
          deviceId: {exact: this.videoDevices[this.currCamIndex].deviceId}
        }; 

    let videoEl = this.getVideoElement();

    this.killAllTracks();
    
    setTimeout(()=>{
      navigator.mediaDevices.getUserMedia({video: this.videoConstraints})
        .then((stream)=>{

            this.currStream = stream;
            
            videoEl.setAttribute("src", window.URL.createObjectURL(stream));
            
            console.log(videoEl.src);
            this.startedVideo = true;
        })
        .catch((err)=>{
            console.error(err);
        });
    }, 200);
    

    
  }


  

  switchCamera() {

    console.log(" ");
    
    if(this.currCamIndex == 0) {
      this.currCamIndex = 1;
    }
    else {
      this.currCamIndex = 0;
    }

    /*
    this.currCamIndex++;
    if(this.currCamIndex == this.videoDevices.length) {
      this.currCamIndex = 0;
    }

    console.log("Curr Cam Index: " + this.currCamIndex);
    console.log("Camera Selected ID: ", this.videoDevices[this.currCamIndex])
    */

    this.startCameraStream();

  }

  killAllTracks() {
      if(typeof this.currStream != "undefined") {
        this.currStream.getTracks().forEach(track=> {
          console.log("Stopping Track: ", track);
          track.stop();
        });
      }
  }


  clickPhoto(): void {

    let videoEl = this.getVideoElement();
    //console.log(videoEl.camera_stream);

    var canvas = document.createElement('canvas');
    canvas.width = videoEl.width;
    canvas.height = videoEl.height;
    canvas.style.width = videoEl.width;
    canvas.style.height = videoEl.height;
    let context = canvas.getContext("2d");
  
    context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    var imageDataURL = canvas.toDataURL('image/png');

    console.log(imageDataURL);

    console.log("Photo Captured");
    this.photoCaptured = true;

    setTimeout(()=>{
      let imgW = (640*this.videoH/480);
      console.log("imgW: " + imgW);
      
      this.imgElement.nativeElement.width = imgW;
      this.imgElement.nativeElement.style.width = imgW;

      this.imgElement.nativeElement.height = this.videoH;
      this.imgElement.nativeElement.style.height = this.videoH;
      
      this.imgElement.nativeElement.src = imageDataURL;


    }, 50);
    
  }


  savePhoto(): void {
    let photoB64 = this.imgElement.nativeElement.src;
    JV_BTReadings.savePhoto(photoB64);
    this.closePhoto();
  }

  cancelSavePhoto(): void {
    
  }


  closePhoto() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    console.log("Picture Dialog Destroyed");
    this.killAllTracks();
  }

}

