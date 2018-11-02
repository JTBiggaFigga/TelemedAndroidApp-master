import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
declare var JV_SharedPreferences:any;

@Component({
  selector: 'vital-reading-view',
  templateUrl: './vital-reading-view.component.html'
})
export class VitalReadingViewComponent implements OnInit {

  @Output()
  onVitalReadingStateChanged = new EventEmitter();

  @Output()
  setTvMessage = new EventEmitter();

  @Input()
  width = 200;

  @Input()
  height = 200;
 
  VITAL_TYPE_NONE = -5000;
	VITAL_TYPE_SPO2 = 1;
	VITAL_TYPE_WEIGHT = 2;
	VITAL_TYPE_BP = 4;
	VITAL_TYPE_ECG = 5;
	VITAL_TYPE_PKFLOW = 6;
	VITAL_TYPE_SUGAR = 7;
	VITAL_TYPE_TEMP = 8;

  @Input()
  currVitalType = this.VITAL_TYPE_NONE;

  @Input()
  vitalDeviceInfo;

  VITAL_STATE_INIT = 100;
	VITAL_STATE_WAITING_FOR_CONNECTION = 101;
	VITAL_STATE_CONNECTED = 102;
	VITAL_STATE_READING_FINISHED = 103;
	VITAL_STATE_ERROR_DISCONNECTED = 111;
	BT_INST_4 = 104;
	BT_TIMEOUT = 110;
	VITAL_STATE_FINISHED = this.VITAL_STATE_INIT;
	BT_404 = 404; // vitalDeviceInfo not found
  

  currVitalReadingState = this.VITAL_STATE_INIT;
  prevVitalReadingState = this.VITAL_STATE_INIT;


  constructor(private changeRef:ChangeDetectorRef) {
  }

  VITAL_VIEW_CHECKING_REGISTRATION = "VITAL_VIEW_CHECKING_REGISTRATION";

  currVitalView = this.VITAL_VIEW_CHECKING_REGISTRATION;

  registered = false;

  ngOnInit() {
    this.checkDeviceRegistration();
  }

  public setCurrVitalReadingState(currVitalReadingState) {

    this.prevVitalReadingState = this.currVitalReadingState;
    this.currVitalReadingState = currVitalReadingState;

    console.log("Updated Vital Reading State from " + this.prevVitalReadingState + " to " + this.currVitalReadingState);
    let stateInfo = {vital: this.currVitalType, old: this.prevVitalReadingState, new: this.currVitalReadingState};
    this.onVitalReadingStateChanged.emit(stateInfo);

  }
  

  private checkDeviceRegistration() {

  }

}
