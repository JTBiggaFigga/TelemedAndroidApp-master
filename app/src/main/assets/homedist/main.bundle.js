webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_icon__ = __webpack_require__("../../../material/esm5/icon.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material_toolbar__ = __webpack_require__("../../../material/esm5/toolbar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material_menu__ = __webpack_require__("../../../material/esm5/menu.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material_snack_bar__ = __webpack_require__("../../../material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_button__ = __webpack_require__("../../../material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_progress_spinner__ = __webpack_require__("../../../material/esm5/progress-spinner.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_list__ = __webpack_require__("../../../material/esm5/list.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_dialog__ = __webpack_require__("../../../material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_app_component__ = __webpack_require__("../../../../../src/app/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__evisit_view_evisit_view_component__ = __webpack_require__("../../../../../src/app/evisit-view/evisit-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_shared_service_service__ = __webpack_require__("../../../../../src/app/services/shared-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_java_call_service__ = __webpack_require__("../../../../../src/app/services/java-call.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_devicelist_service__ = __webpack_require__("../../../../../src/app/services/devicelist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__vital_reading_view_vital_reading_view_component__ = __webpack_require__("../../../../../src/app/vital-reading-view/vital-reading-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ecg_view_ecg_view_component__ = __webpack_require__("../../../../../src/app/ecg-view/ecg-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__chf_checkup_chf_checkup_component__ = __webpack_require__("../../../../../src/app/chf-checkup/chf-checkup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pipes_safe_pipe__ = __webpack_require__("../../../../../src/app/pipes/safe.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_12__evisit_view_evisit_view_component__["a" /* EVisitViewComponent */],
                __WEBPACK_IMPORTED_MODULE_16__vital_reading_view_vital_reading_view_component__["a" /* VitalReadingViewComponent */],
                __WEBPACK_IMPORTED_MODULE_17__ecg_view_ecg_view_component__["a" /* EcgViewComponent */],
                __WEBPACK_IMPORTED_MODULE_18__chf_checkup_chf_checkup_component__["a" /* ChfCheckupComponent */],
                __WEBPACK_IMPORTED_MODULE_11__app_app_component__["b" /* PhotoDialog */],
                __WEBPACK_IMPORTED_MODULE_18__chf_checkup_chf_checkup_component__["b" /* YoutubeDialog */],
                __WEBPACK_IMPORTED_MODULE_11__app_app_component__["c" /* VitalChartsDialog */],
                __WEBPACK_IMPORTED_MODULE_19__pipes_safe_pipe__["a" /* SafePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material_toolbar__["a" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material_menu__["a" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material_icon__["a" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material_snack_bar__["b" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material_button__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material_progress_spinner__["a" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material_list__["a" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material_dialog__["c" /* MatDialogModule */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_18__chf_checkup_chf_checkup_component__["b" /* YoutubeDialog */], __WEBPACK_IMPORTED_MODULE_11__app_app_component__["c" /* VitalChartsDialog */], __WEBPACK_IMPORTED_MODULE_11__app_app_component__["b" /* PhotoDialog */]],
            providers: [__WEBPACK_IMPORTED_MODULE_13__services_shared_service_service__["a" /* SharedService */], __WEBPACK_IMPORTED_MODULE_14__services_java_call_service__["a" /* JavaCallService */], __WEBPACK_IMPORTED_MODULE_15__services_devicelist_service__["a" /* DevicelistService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_11__app_app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<style>\n\n    .spacer {\n        flex: 1 1 auto;\n    }\n\n    button {\n        z-index: 0;\n    }\n    .vitalDeviceInfo-btn {\n        width:100%;\n    }\n\n    .devices-td {\n        padding:5px;\n        overflow-y:auto;\n        overflow-x:none;\n    }\n    .tv-td {\n        height:100%;\n\n        border-style:solid;\n        border-color:black;\n        border-width:0px;\n\n    }\n\n    .tv-top-div {\n        margin: auto;\n        width:95%;\n        height:80%;\n        min-height:80%;\n        padding:5px;\n\n        overflow-y:auto;\n        text-align:center;\n\n        border-style:solid;\n        border-color:grey;\n        border-width:0px;\n    }\n    .tv-mesg-div {\n        margin: auto;\n        margin-top: 6px;\n        width:95%;\n        height:20%;\n        padding:10px;\n\n        text-align:center;\n        color:black;\n\n        border-radius: 10px;\n\n        box-shadow: 0 -5px 10px -2px rgba(182, 182, 182, 0.75);\n\n        font-size: 90%;\n\n        background: linear-gradient(180deg, #E8EAF6, white);\n\n        /*border-style:solid;\n        border-color:green;\n        border-width:0px;*/\n    }\n\n    .bottom-shadow {\n        box-shadow: 0px 4px 5px 3px rgba(128, 128, 128, 0.5);\n    }\n\n    .tv-div-div {\n        margin: auto;\n        vertical-align: middle;\n        text-align:center;\n\n        border-style:solid;\n        border-color:red;\n        border-width:0px;\n    }\n\n    .tv-div-div-div {\n        margin: auto;\n        vertical-align: middle;\n        text-align:center;\n\n        border-style:solid;\n        border-color:red;\n        border-width:0px;\n    }\n\n\n    .centered, mat-spinner {\n        margin: auto;\n    }\n\n\n    .blink {\n        animation-duration: 1s;\n        animation-name: blink;\n        animation-iteration-count: infinite;\n        animation-direction: alternate;\n        animation-timing-function: ease-in-out;\n    }\n\n    @keyframes blink {\n        from {\n            opacity: 1;\n        }\n        to {\n            opacity: 0.3;\n        }\n    }\n\n     .dev-separator {\n         height:5px;\n     }\n\n     .doc-separator {\n         height:10px;\n     }\n</style>\n\n<mat-toolbar style=\"width:100%\" color=\"primary\">\n\n    <mat-toolbar-row>\n        \n        <!--<span>\n            <button mat-menu-item  [matMenuTriggerFor]=\"settingsMenu\" >\n                <i class=\"fa fa-cog\" aria-hidden=\"true\"></i>\n            </button>\n        </span>-->\n\n        <img src='assets/img/Leaf.png' width=\"30\" style=\"opacity:0.8\"/>\n        &nbsp;\n        <b>mCare</b> &nbsp;&nbsp; <i>premium</i>\n        \n\n        <span class=\"spacer\"></span>\n\n\n        <span>{{patientProfile.fullName}}</span>\n        &nbsp;&nbsp;\n        <img width=\"40\" height=\"40\" src=\"{{patientProfile.pictureUrl}}\" [matMenuTriggerFor]=\"menu\" style=\"border-radius:40%;\" />\n\n        <!--<button mat-menu-item  [matMenuTriggerFor]=\"menu\" >\n            <i class=\"fas fa-bars\"></i>\n        </button>-->\n\n        <!--<button mat-icon-button>\n            <mat-icon>more_vert</mat-icon>\n        </button>-->\n\n        <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item (click)=\"resetEverything()\">\n                <i class=\"fas fa-sync\"></i>\n                <span>Reset</span>\n            </button>\n            <button mat-menu-item (click)=\"closeApp()\">\n                <i class=\"fas fa-window-close\"></i>\n                <span>Close</span>\n            </button>\n            <!--<button mat-menu-item (click)=\"logout\">\n                <i class=\"fas fa-sign-out-alt\"></i>\n                <span>Logout</span>\n            </button>-->\n        </mat-menu>\n        \n    </mat-toolbar-row>\n</mat-toolbar>\n\n<table class=\"main-table\">\n    <tr>\n        <td width=\"20%\" class=\"devices-td\">\n\n            <button class=\"vitalDeviceInfo-btn\" style=\"text-align:right\" mat-raised-button (click)=\"takeReading(sharedService.VITAL_TYPE_SPO2)\" [disabled]=\"takingReadingBool || runningCheckupBool\">\n                Blood Oxygen &nbsp;&nbsp; <i class=\"fas fa-hand-point-right\"></i>\n            </button>\n\n            <div class=\"dev-separator\"></div>\n\n            <button class=\"vitalDeviceInfo-btn\" style=\"text-align:right\" mat-raised-button (click)=\"takeReading(sharedService.VITAL_TYPE_SUGAR)\" [disabled]=\"takingReadingBool || runningCheckupBool\">\n                Blood Sugar &nbsp;&nbsp; <i class=\"fas fa-tint\"></i>\n            </button>\n\n            <div class=\"dev-separator\"></div>\n\n            <button class=\"vitalDeviceInfo-btn\" style=\"text-align:right\" mat-raised-button (click)=\"takeReading(sharedService.VITAL_TYPE_BP)\" [disabled]=\"takingReadingBool || runningCheckupBool\">\n                Blood Pressure &nbsp;&nbsp; <i class=\"fas fa-chart-line\"></i>\n            </button>\n            \n            <div class=\"dev-separator\"></div>\n\n            <button class=\"vitalDeviceInfo-btn\" style=\"text-align:right\" mat-raised-button (click)=\"takeReading(sharedService.VITAL_TYPE_WEIGHT)\" [disabled]=\"takingReadingBool || runningCheckupBool\">\n                Body Weight &nbsp;&nbsp; <i class=\"fab fa-cloudscale\"></i>\n            </button>\n            \n            <div class=\"dev-separator\"></div>\n\n            <button class=\"vitalDeviceInfo-btn\" style=\"text-align:right\" mat-raised-button (click)=\"takeReading(sharedService.VITAL_TYPE_ECG)\" [disabled]=\"takingReadingBool || runningCheckupBool\">\n                ECG &nbsp;&nbsp; <i class=\"fas fa-heartbeat\"></i>\n            </button>\n            \n            <!--\n            <div style=\"height:1px\"></div>\n            <button class=\"vitalDeviceInfo-btn\" style=\"text-align:right\" mat-raised-button (click)=\"takeQuestionnaire()\" [disabled]=\"takingReadingBool\">Questionnaire <i class=\"fas fa-question\"></i></button>\n            -->\n\n            <div class=\"doc-separator\"></div>\n            \n            <button *ngIf=\"eVisitState.IN_AN_EVISIT || lookingUpDoctorsBool\" color=\"accent\" class=\"vitalDeviceInfo-btn\" mat-raised-button (click)=\"cancelEVisit()\" [disabled]=\"takingReadingBool || runningCheckupBool\"><b>Cancel EVisit &nbsp;&nbsp; <i class=\"fas fa-ban\"></i></b></button>\n\n            <button *ngIf=\"!(eVisitState.IN_AN_EVISIT || lookingUpDoctorsBool)\" color=\"primary\" class=\"vitalDeviceInfo-btn\" mat-raised-button (click)=\"findDoctors()\" [disabled]=\"takingReadingBool || runningCheckupBool\"><b>Find Doctors &nbsp;&nbsp; <i class=\"fas fa-user-md\"></i></b></button>\n\n        </td>\n        <td width=\"79%\" class=\"tv-td\" #tvTd valign=\"top\">\n\n            <div #tvTopDiv class=\"tv-top-div\">\n\n                <div *ngIf=\"currTvView == TV_VIEW_HOME && !takingReadingBool\" class=\"tv-div-div\">\n                    \n                    <img src=\"assets/img/homeimg.jpg\" [height]=\"0.8*tvHeight\" style=\"opacity: 0.8;\" />\n                    \n                    <br />\n\n                    <button mat-raised-button color=\"primary\" (click)=\"viewCharts()\">\n                        Charts &nbsp;&nbsp; <i class=\"fas fa-chart-bar\"></i>\n                    </button>\n\n                    <button mat-raised-button color=\"primary\" (click)=\"runChfCheckup()\">\n                        Check Up &nbsp;&nbsp; <i class=\"fas fa-medkit\"></i>\n                    </button>\n\n                    <button mat-raised-button color=\"primary\" (click)=\"takePhoto()\">\n                        Take Picture &nbsp;&nbsp; <i class=\"fas fa-camera\"></i>\n                    </button>\n                </div>\n\n                <div *ngIf=\"currTvView == TV_VIEW_CHECKUP && !takingReadingBool\" class=\"tv-div-div\">\n                     <chf-checkup [patientId]=\"patientProfile.auth0UserId\" [auth0Headers]=\"auth0Headers\" [height]=\"tvHeight - 5\" [width]=\"tvWidth - 5\"></chf-checkup>\n                </div>\n\n                <!-- EVISIT VIEWS -->\n                <div *ngIf=\"currTvView == TV_VIEW_EVISIT_FETCHING_ONLINE_DOCTORS\" class=\"tv-div-div\">\n                    <h4>Searching Online Doctors ... </h4>\n                    <br /><br />\n                    <mat-spinner [diameter]=\"50\" class=\"centered\"></mat-spinner>\n                </div>\n\n                <div *ngIf=\"currTvView == TV_VIEW_EVISIT_ONLINE_DOCTORS_LIST_READY\" class=\"tv-div-div\">\n                    <h4>Online Doctors <span *ngIf=\"doctorsProfileList.length > 0\">({{doctorsProfileList.length}})</span></h4>\n                    <div *ngIf=\"doctorsProfileList.length == 0 && fetchingListCompleteBool\">\n                        <div class=\"blink\">Preparing List ... </div>\n                        <br />\n                        <mat-spinner [diameter]=\"50\" class=\"centered\"></mat-spinner>\n                    </div>\n                    <div *ngIf=\"doctorsProfileList.length > 0 && fetchingListCompleteBool\">\n                        <div *ngFor=\"let doc of doctorsProfileList\" style=\"padding:5px;\">\n                            <button mat-raised-button style=\"width:50%\" (click)=\"enqueueToThisDoctor(doc)\">\n                                <!--<img [src]=\"doc.picture\" width=\"20\"/>-->\n                                {{doc.full_name}} \n                            </button>\n                        </div>\n                    </div>\n                    <div *ngIf=\"doctorsEVisitInfoList.length == 0 && fetchingListCompleteBool\">\n                        <i class=\"blink\">\n                        No Doctors Online Right Now.\n                        <br />\n                        Please Try Again Later\n                        </i>\n\n                    </div>\n                </div>\n                <div *ngIf=\"currTvView == TV_VIEW_EVISIT_REQUESTING_LIST_READY\" class=\"tv-div-div\" [style.height]=\"tvHeight\">\n                    <h4>Knocking on Doctor's Office Door ...</h4>\n                    <br />\n                    <mat-spinner [diameter]=\"50\" class=\"centered\"></mat-spinner>\n                </div>\n                <!--<div *ngIf=\"currTvView == TV_VIEW_EVISIT_ENTERING_DOCTORS_OFFICE\" class=\"tv-div-div\" [style.height]=\"tvHeight\">\n                    <br /><br />\n                    <div class=\"blink\">Entering Doctor's Office ... </div>\n                    <br /><br />\n                    <mat-spinner [diameter]=\"50\" class=\"centered\"></mat-spinner>\n                </div>-->\n                <div *ngIf=\"currTvView == TV_VIEW_EVISIT_IN_WAITING_ROOM\" class=\"tv-div-div\" [style.height]=\"tvHeight\">\n                    <h4>In The Waiting Room ...  </h4>\n                    <br />\n                    <div\n                        >Queue Position:\n                        <span *ngIf=\"currEvisitPosition == -1\">\n                            <i class=\"blink\">querying ... </i>\n                        </span>\n                        <span *ngIf=\"currEvisitPosition > 0\">{{currEvisitPosition}}</span>\n                    </div>\n\n                    <div *ngIf=\"currEvisitPosition == 1\" class=\"blink\"><br />You're the next patient ...<br />Waiting on doctor to let you in!</div>\n                </div>\n                <div *ngIf=\"currTvView == TV_VIEW_EVISIT_IN_SESSION\" class=\"tv-div-div\" [style.height]=\"tvHeight\">\n                    <!--<evisit-view [width]=\"tvWidth\" [height]=\"tvHeight\"\n                        [opentokToken]=\"eVisitState.currOpentokToken\"\n                        [opentokSessionId]=\"eVisitState.currOpentokSessionId\"\n                        [opentokApiKey]=\"eVisitState.currOpentokApiKey\">\n                    </evisit-view>-->\n\n                                        \n                    <iframe  allow=\"geolocation; microphone; camera;\" #evisitIFrame frameBorder=\"0\" scrolling=\"no\"></iframe>\n                    \n                </div>\n\n                <!-- VITAL READING VIEWS -->\n                <div *ngIf=\"currTvView != TV_VIEW_EVISIT_IN_SESSION && takingReadingBool\" class=\"tv-div-div\" [style.height]=\"tvHeight\">\n                    <!--<vital-reading-view\n                        (onVitalReadingStateChanged)=\"onVitalReadingStateChanged\"\n                        (setmainTvMessage)=\"setmainTvMessage\" \n                        [currVitalType]=\"currVitalType\"\n                        [width]=\"tvWidth\" \n                        [height]=\"tvHeight\"\n                        [vitalDeviceInfo]=\"deviceListService.noninDeviceInfo\"\n                    >   \n                    </vital-reading-view>-->\n                    \n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_CHECKING_REGISTRATION\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <h4>Checking Registration of a<br />{{currVitalDeviceModelInfo.device_model_number}}</h4>\n                        <mat-spinner [diameter]=\"50\" class=\"centered\"></mat-spinner>\n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_NOT_REGISTERED\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <table width=\"100%\" height=\"100%\">\n                            <tr>\n                                <td width=\"60%\">\n                                    <h4>{{currVitalDeviceModelInfo.device_model_number}}<br />Is Not Registered With This App</h4>\n                                    Would you like to register<br />a new device?\n                                    <br /><br />\n                                    <button mat-raised-button color=\"primary\" (click)=\"lookupDevices(currVitalDeviceModelInfo)\">Yes</button>\n                                    &nbsp;&nbsp;\n                                    <button mat-raised-button color=\"warn\" (click)=\"cancelRegistration()\">Cancel</button>\n                                </td>\n                                <td width=\"50%\">\n                                    <img [src]=\"currVitalDeviceModelInfo.device_img_src\" width=\"70%\" />\n                                </td>\n                            </tr>\n                        </table>\n\n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_BT_PAIRING_LOOKUP\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <table width=\"100%\" height=\"100%\">\n                            <tr>\n                                <td width=\"40%\">\n                                    <h4>Discovering<br />{{currVitalDeviceModelInfo.device_model_number}}</h4>\n                                    <mat-spinner [diameter]=\"50\" class=\"centered\"></mat-spinner>\n                                    <br />\n                                    <button mat-raised-button color=\"warn\" (click)=\"cancelRegistration()\">Cancel</button>\n                                </td>\n                                <td>\n\n                                    <!--\n                                        To be used when image is available ... \n                                        <img [src]=\"currVitalDeviceModelInfo.di_device_comm.di_comm_info.di_pairing_info.di_pairing_instruction.img_src\" width=\"50%\" />\n                                    -->\n                                    <img [src]=\"currVitalDeviceModelInfo.device_img_src\" width=\"30%\" />\n                                    <br />\n                                    {{currVitalDeviceModelInfo.di_device_comm.di_comm_info.di_pairing_info.di_pairing_instruction.text}}\n                                </td>\n                            </tr>\n                        </table>\n                    </div>\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_BT_SPP_DEVICES_FOUND\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <h4>Lookup Complete ... </h4>\n                        <div *ngIf=\"devicesDiscovered.length > 0\">\n                            <div *ngFor=\"let dev of devicesDiscovered\" style=\"padding:5px;\">\n                                <button mat-raised-button style=\"width:50%\" (click)=\"createBluetoothBond(dev)\">\n                                    {{dev.btname}} <i *ngIf=\"dev.paired\">(p)</i>\n                                </button>\n                            </div>\n                        </div>\n                        <div *ngIf=\"devicesDiscovered.length == 0\">\n                            <i class=\"blink\">\n                            No Devices Found ... \n                            </i>\n                            <br /><br />\n                            <button mat-raised-button color=\"primary\" (click)=\"lookupDevices(currVitalDeviceModelInfo)\">Try Again</button>\n                            &nbsp;&nbsp;\n                            <button mat-raised-button color=\"warn\" (click)=\"cancelRegistration()\">Cancel</button>\n\n                        </div>\n                    </div>\n                    \n\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_BT_BLE_DEVICES_FOUND\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <h4>Scanning Complete ... </h4>\n\n                        <div *ngIf=\"devicesDiscovered.length > 0\">\n                            <div *ngFor=\"let dev of devicesDiscovered\" style=\"padding:5px;\">\n                                <button mat-raised-button style=\"width:50%\" (click)=\"registerDevice(dev)\">\n                                    {{dev.btname}}\n                                </button>\n                            </div>\n                        </div>\n\n                        <div *ngIf=\"devicesDiscovered.length == 0\">\n                            <i class=\"blink\">\n                            No Devices Found ... \n                            </i>\n                            <br /><br />\n                            <button mat-raised-button color=\"primary\" (click)=\"lookupDevices(currVitalDeviceModelInfo)\">Try Again</button>\n                            &nbsp;&nbsp;\n                            <button mat-raised-button color=\"warn\" (click)=\"cancelRegistration()\">Cancel</button>\n\n                        </div>\n                    </div>\n\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_BT_PAIRING_FAILED\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <h4>Pairing Failed!</h4>\n                        \n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_BT_PAIRING_SUCCESS\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <h4>Pairing Successful!</h4>\n                        \n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_BT_REGISTERING\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        \n                        <table width=\"100%\" height=\"100%\">\n                            <tr>\n                                <td width=\"70%\">\n                                    <h4>Registering Device ... </h4>\n                                    <mat-spinner [diameter]=\"50\" class=\"centered\"></mat-spinner>                                                                \n                                </td>\n                                <td width=\"50%\">\n                                    <img [src]=\"currVitalDeviceModelInfo.device_img_src\" width=\"30%\" />\n                                    <br />\n                                    <small>{{currRegisteredDeviceInfo.btname}}</small>\n                                </td>\n                            </tr>\n                        </table>\n\n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_BT_REGISTERED\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <table width=\"100%\" height=\"100%\">\n                            <tr>\n                                <td>\n                                    <h4>Device Registered!</h4>\n                                    <img [src]=\"currVitalDeviceModelInfo.device_img_src\" height=\"200\" />\n                                    <br />\n                                    <small>{{currRegisteredDeviceInfo.btname}}</small>\n                                </td>\n                            </tr>\n                        </table>\n                        \n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_CONNECTING\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <table width=\"95%\" height=\"95%\">\n                            <tr>\n                                <td>\n                                    <b>{{currRegisteredDeviceInfo.btname}}</b>\n                                    <br />\n                                    <img [src]=\"currInstructionImageUrl\" [width]=\"instImgWidth\" [height]=\"instImgHeight\" />\n                                    <br />\n                                    <span class=\"blink\">Connecting ... </span>\n                                </td>\n                            </tr>\n                        </table>\n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_SPP_NOT_PAIRED\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <table width=\"95%\" height=\"95%\">\n                            <tr>\n                                <td>\n                                    <h4>{{currRegisteredDeviceInfo.btname}}\n                                        <br />\n                                        Is Not Paired!\n                                    </h4>\n                                    <button mat-raised-button color=\"primary\" (click)=\"connectToCurrDevice()\">Register</button>\n                                    &nbsp;&nbsp;\n                                    <button mat-raised-button color=\"warn\" (click)=\"initHome()\">Cancel</button>                            \n                                </td>\n                                <td valign=\"top\">\n                                    <img [src]=\"currVitalDeviceModelInfo.device_img_src\" width=\"30%\" />\n                                </td>\n                            </tr>\n                        </table>\n                    </div>\n                    \n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_CONNECTED\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n\n                        <table width=\"95%\" height=\"95%\" *ngIf=\"currVitalType!=sharedService.VITAL_TYPE_ECG\" >\n                            <tr>\n                                <td>\n                                    <b>Connected: {{currRegisteredDeviceInfo.btname}}</b>\n                                    <br />\n                                    <img [src]=\"currInstructionImageUrl\" [width]=\"instImgWidth\" [height]=\"instImgHeight\" />\n                                    <br />\n                                    {{vitalReadingMiniMesg}}\n                                </td>\n                            </tr>\n                        </table>\n                        <ecg-view  *ngIf=\"currVitalType==sharedService.VITAL_TYPE_ECG\" [width]=\"tvWidth\" [height]=\"tvHeight\"></ecg-view>\n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_FINISHED\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <table width=\"95%\" height=\"95%\">\n                            <tr>\n                                <td>\n                                    <b>Reading Finished</b>\n                                    <br />\n                                    <img [src]=\"currInstructionImageUrl\" [width]=\"instImgWidth\" [height]=\"instImgHeight\" />\n                                    <br />\n                                    {{vitalReadingMiniMesg}}\n                                </td>\n                            </tr>\n                        </table>\n                    </div>\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_FINISHED_SHOW_FINAL_READING\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <table width=\"100%\" height=\"100%\">\n                            <tr>\n                                <td>\n                                    <h4>Reading Finished</h4>\n                                    <br />\n                                    <span style=\"font-size:150%;\" [innerHTML]=\"finalReadingMesg\"></span>\n                                </td>\n                            </tr>\n                        </table>\n                    </div>\n\n                    \n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_TIMEOUT\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <h4>Timed Out</h4>\n                        {{currErrorMesg}}\n                    </div>\n\n\n                    <div *ngIf=\"currVitalReadingView == VITAL_VIEW_ERROR\" class=\"tv-div-div-div\" [style.height]=\"tvHeight\">\n                        <h4>There was an error!</h4>\n                        {{currErrorMesg}}\n                    </div>\n\n\n                </div> \n            </div>\n\n\n            <div #tvMesgDiv class=\"tv-mesg-div\">{{mainTvMessage}}</div>\n        </td>\n    </tr>\n</table>\n"

/***/ }),

/***/ "../../../../../src/app/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VitalChartsDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PhotoDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_service_service__ = __webpack_require__("../../../../../src/app/services/shared-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_java_call_service__ = __webpack_require__("../../../../../src/app/services/java-call.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_devicelist_service__ = __webpack_require__("../../../../../src/app/services/devicelist.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






//declare var shared:any;
var AppComponent = (function () {
    //constructor(public snackBar: MatSnackBar) {
    function AppComponent(snackBar, sharedService, javaCallService, changeRef, deviceListService, zone, dialog) {
        var _this = this;
        this.snackBar = snackBar;
        this.sharedService = sharedService;
        this.javaCallService = javaCallService;
        this.changeRef = changeRef;
        this.deviceListService = deviceListService;
        this.zone = zone;
        this.dialog = dialog;
        this.lastOperationStartedAt = -1;
        this.lastOperationCancelledAt = -1;
        this.title = 'app';
        this.eVisitState = {
            IN_AN_EVISIT: false,
            currDoctorProfile: {},
            currEvisitId: "",
            currOpentokToken: "",
            currOpentokSessionId: "",
            currOpentokApiKey: ""
        };
        this.mainTvMessage = "";
        this.vitalReadingMiniMesg = "";
        this.tvWidth = 100;
        this.tvHeight = 100;
        this.TV_VIEW_HOME = "TV_VIEW_HOME";
        this.TV_VIEW_EVISIT_FETCHING_ONLINE_DOCTORS = "TV_VIEW_EVISIT_FETCHING_ONLINE_DOCTORS";
        this.TV_VIEW_EVISIT_ONLINE_DOCTORS_LIST_READY = "TV_VIEW_EVISIT_ONLINE_DOCTORS_LIST_READY";
        this.TV_VIEW_EVISIT_REQUESTING_LIST_READY = "TV_VIEW_EVISIT_REQUESTING_LIST_READY";
        this.TV_VIEW_EVISIT_ENTERING_DOCTORS_OFFICE = "TV_VIEW_EVISIT_ENTERING_DOCTORS_OFFICE";
        this.TV_VIEW_EVISIT_IN_WAITING_ROOM = "TV_VIEW_EVISIT_IN_WAITING_ROOM";
        this.TV_VIEW_EVISIT_IN_SESSION = "TV_VIEW_EVISIT_IN_SESSION";
        this.TV_VIEW_CHECKUP = "TV_VIEW_CHECKUP";
        this.currTvView = "";
        this.currStuff = "";
        /*testEcg() {
      
          this.takingReadingBool = true;
          this.currVitalType = this.sharedService.VITAL_TYPE_ECG;
          this.currVitalReadingView = this.VITAL_VIEW_CONNECTED;
      
          JV_BTReadings.testEcg();
        }*/
        this.instImgWidth = 0;
        this.instImgHeight = 0;
        this.lookingUpDoctorsBool = false;
        //////// CHF CHECKUP ////////////////////
        this.runningCheckupBool = false;
        ////////////// EVISIT ////////////////////
        this.tempPictureUrl = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
        this.doctorsEVisitInfoList = [];
        this.doctorsProfileList = [];
        this.SERVER_BASE_URL = this.sharedService.SERVER_BASE_URL;
        this.URL_GET_USER_PROFILE = this.SERVER_BASE_URL + "/auth0/user";
        this.URL_GET_DRCHRONO_DOCTOR_PROFILE = this.SERVER_BASE_URL + "/doctor/profile";
        this.URL_GET_ONLINE_DOCTORS_LIST = this.SERVER_BASE_URL + "/evisit/patient/online_doctors";
        this.URL_POST_PATIENT_ENQUEUE = this.SERVER_BASE_URL + "/evisit/patient/enqueue";
        this.URL_GET_HAS_EVISIT_BEGUN = this.SERVER_BASE_URL + "/evisit/patient/has_doctor_let_me_in";
        this.URL_GET_EVISIT_STATE = this.SERVER_BASE_URL + "/evisit/state";
        this.URL_VITAL_CHARTS = "";
        // async placeIn(corrIndex, userId, populateDocInfoList) {
        //   var docInfo;// get from ajax call
        //   this.sharedService.ajaxGetCall(this.URL_GET_USER_PROFILE+"?user_id="+encodeURI(userId), this.auth0Headers, (response)=>{
        //     var docInfo = JSON.parse(response.body);
        //     populateDocInfoList(corrIndex, docInfo);
        //   });
        // }
        this.evisitIFrameUrl = "about:blank";
        this.fetchingListCompleteBool = false;
        this.currEvisitPosition = -1;
        // VITAL READINGS .... 
        this.takingReadingBool = false;
        this.currVitalType = this.sharedService.VITAL_TYPE_NONE;
        this.VITAL_STATE_INIT = 100;
        this.VITAL_STATE_WAITING_FOR_CONNECTION = 101;
        this.VITAL_STATE_CONNECTED = 102;
        this.VITAL_STATE_READING_FINISHED = 103;
        this.VITAL_STATE_ERROR_DISCONNECTED = 111;
        this.BT_INST_4 = 104;
        this.BT_TIMEOUT = 110;
        this.VITAL_STATE_FINISHED = this.VITAL_STATE_INIT;
        this.BT_404 = 404; // vitalDeviceInfo not found
        this.VITAL_VIEW_CHECKING_REGISTRATION = "VITAL_VIEW_CHECKING_REGISTRATION";
        this.VITAL_VIEW_NOT_REGISTERED = "VITAL_VIEW_NOT_REGISTERED";
        this.VITAL_VIEW_BT_PAIRING_LOOKUP = "VITAL_VIEW_BT_PAIRING_LOOKUP";
        this.VITAL_VIEW_BT_SPP_DEVICES_FOUND = "VITAL_VIEW_BT_PAIRING_DEVICES_FOUND";
        this.VITAL_VIEW_BT_BLE_DEVICES_FOUND = "VITAL_VIEW_BT_BLE_DEVICES_FOUND";
        this.VITAL_VIEW_BT_PAIRING_ATTEMPT = "VITAL_VIEW_BT_PAIRING_ATTEMPT";
        this.VITAL_VIEW_BT_PAIRING_FAILED = "VITAL_VIEW_BT_PAIRING_FAILED";
        this.VITAL_VIEW_BT_PAIRING_SUCCESS = "VITAL_VIEW_BT_PAIRING_SUCCESS";
        this.VITAL_VIEW_BT_REGISTERING = "VITAL_VIEW_BT_REGISTERING";
        this.VITAL_VIEW_BT_REGISTERED = "VITAL_VIEW_BT_REGISTERED";
        this.VITAL_VIEW_CONNECTING = "VITAL_VIEW_SPP_CONNECTING";
        this.VITAL_VIEW_SPP_NOT_PAIRED = "VITAL_VIEW_SPP_NOT_PAIRED";
        this.VITAL_VIEW_CONNECTED = "VITAL_VIEW_SPP_CONNECTED";
        this.VITAL_VIEW_FINISHED = "VITAL_VIEW_FINISHED";
        this.VITAL_VIEW_FINISHED_SHOW_FINAL_READING = "VITAL_VIEW_FINISHED_SHOW_FINAL_READING";
        this.VITAL_VIEW_TIMEOUT = "VITAL_VIEW_TIMEOUT";
        this.VITAL_VIEW_ERROR = "VITAL_VIEW_ERROR";
        this.currVitalReadingView = this.VITAL_VIEW_CHECKING_REGISTRATION;
        this.currMiniMessage = "";
        this.devicesDiscovered = [];
        this.currInstructionImageUrl = "";
        this.finalReadingMesg = "";
        this.currErrorMesg = "";
        ////////////// PHOTO ////////////////////
        this.takingPhoto = false;
        this.currStuff = "Savio";
        console.log("output of eval: " + eval("this.currStuff=='Savio'"));
        this.initEVisitState();
        HomeJs.MainUi = {
            dummy: function (args) { _this.zone.run(function () { _this.dummy(args); }); },
            //onNewDataCh1: (sampleArr) => {this.zone.run(()=>{this.onNewDataCh1(sampleArr)})},
            toastThis: function (text) { _this.zone.run(function () { _this.snackBar.open(text, "", { duration: 2000 }); }); },
            onSppDevicesDiscovered: function (deviceListJson) { _this.zone.run(function () { _this.onSppDevicesDiscovered(deviceListJson); }); },
            onBleDevicesDiscovered: function (deviceListJson) { _this.zone.run(function () { _this.onBleDevicesDiscovered(deviceListJson); }); },
            onPairingSuccess: function (devInfoJson) { _this.zone.run(function () { _this.onPairingSuccess(devInfoJson); }); },
            onPairingFailed: function (devInfoJson) { _this.zone.run(function () { _this.onPairingFailed(devInfoJson); }); },
            onSppDeviceNotPairedForConnect: function (devInfoJson) { _this.zone.run(function () { _this.onSppDeviceNotPairedForConnect(devInfoJson); }); },
            onSppVitalConnected: function (devInfoJson) { _this.zone.run(function () { _this.onSppVitalConnected(devInfoJson); }); },
            onBleVitalConnected: function (devInfoJson) { _this.zone.run(function () { _this.onBleVitalConnected(devInfoJson); }); },
            setVitalReadingMiniMesg: function (text) { _this.zone.run(function () { _this.setVitalReadingMiniMesg(text); }); },
            onVitalReadingFinished: function (vitalType, finalReadingMesg) { _this.zone.run(function () { _this.onVitalReadingFinished(vitalType, finalReadingMesg); }); },
            onVitalReadingError: function (vitalType, errorMesg) { _this.zone.run(function () { _this.onVitalReadingError(vitalType, errorMesg); }); },
            onVitalReadingTimeout: function (vitalType) { _this.zone.run(function () { _this.onVitalReadingTimeout(vitalType); }); },
        };
        if (typeof JV_SharedPreferences == "undefined") {
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
            this.auth0Headers = { authorization: "Bearer " + this.patientProfile.auth0IdToken };
        }
        else {
            this.patientProfile = JSON.parse(JV_SharedPreferences.getString(SP.PREF_KEY_PATIENT_PROFILE));
            this.auth0Headers = { authorization: "Bearer " + this.patientProfile.auth0IdToken };
            console.log();
        }
        this.doctorsEVisitInfoList = [
            { name: "dr  1", picture: this.tempPictureUrl },
            { name: "dr  2", picture: this.tempPictureUrl },
            { name: "dr  3", picture: this.tempPictureUrl },
            { name: "dr  4", picture: this.tempPictureUrl },
            { name: "dr  5", picture: this.tempPictureUrl },
            { name: "dr  6", picture: this.tempPictureUrl },
            { name: "dr  7", picture: this.tempPictureUrl },
            { name: "dr  8", picture: this.tempPictureUrl },
            { name: "dr  9", picture: this.tempPictureUrl },
            { name: "dr 10", picture: this.tempPictureUrl }
        ];
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.mainAppReferenceStr = this.sharedService.generateRandomString("ref_", 10);
        console.log("app ref: " + this.mainAppReferenceStr);
        window[this.mainAppReferenceStr] = this;
        this.javaCallService.setMainAppReferenceStr(this.mainAppReferenceStr);
        var tvTdWidth = this.tvTd.nativeElement.clientWidth;
        var tvTdHeight = this.tvTd.nativeElement.clientHeight;
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
        this.URL_VITAL_CHARTS = this.SERVER_BASE_URL + "/vitals/charts/mobile?token=" + this.patientProfile.auth0IdToken + "&patientId=" + this.patientProfile.auth0UserId;
        this.runningCheckupBool = false;
        this.takingReadingBool = false;
        setTimeout(function () {
            _this.initHome();
        }, 1000);
        setTimeout(function () {
            //this.testEcg();
        }, 5000);
    };
    AppComponent.prototype.closeApp = function () {
        JV_BTReadings.closeApp();
    };
    AppComponent.prototype.initHome = function () {
        window[this.mainAppReferenceStr] = this;
        this.javaCallService.setMainAppReferenceStr(this.mainAppReferenceStr);
        console.log("initializing HOME");
        this.setMainMessage("Welcome to mCare");
        this.currTvView = this.TV_VIEW_HOME;
        this.lookingUpDoctorsBool = false;
        this.takingReadingBool = false;
        this.setCancelledAtTimestamp();
        //this.recentlyCancelledEVisit = false; // bad idea ...
    };
    AppComponent.prototype.dummy = function (args) {
    };
    AppComponent.prototype.setStartedAtTimestamp = function () {
        console.log("typeof JV_BTReadings: ", typeof JV_BTReadings);
        if (typeof JV_BTReadings != "undefined")
            this.lastOperationStartedAt = this.getCurrentTimestamp();
        console.log("major operation started at: " + this.lastOperationStartedAt);
        if (typeof JV_BTReadings != "undefined")
            JV_BTReadings.setLastOperationStartedAt(this.lastOperationStartedAt);
    };
    AppComponent.prototype.setCancelledAtTimestamp = function () {
        console.log("typeof JV_BTReadings: ", typeof JV_BTReadings);
        if (typeof JV_BTReadings != "undefined")
            this.lastOperationCancelledAt = this.getCurrentTimestamp();
        console.log("major operation cancelled at: " + this.lastOperationCancelledAt);
        console.log("typeof JV_BTReadings: ", typeof JV_BTReadings);
        if (typeof JV_BTReadings != "undefined")
            JV_BTReadings.setLastOperationCancelledAt(this.lastOperationCancelledAt);
    };
    AppComponent.prototype.setMainMessage = function (mesg) {
        console.log("Setting Main Message: " + mesg);
        this.mainTvMessage = mesg;
    };
    AppComponent.prototype.showTempTvMessage = function (mesg) {
        var _this = this;
        if (typeof this.tvMessageTimeoutId != "undefined")
            clearTimeout(this.tvMessageTimeoutId);
        this.setMainMessage(mesg);
        this.tvMessageTimeoutId = setTimeout(function () {
            _this.setMainMessage("");
        }, 3000);
    };
    AppComponent.prototype.speak = function (mesg) {
        console.log("Speaking TTS: '" + mesg + "'");
        JV_BTReadings.speak(mesg);
    };
    AppComponent.prototype.runChfCheckup = function () {
        this.runningCheckupBool = true;
        this.currTvView = this.TV_VIEW_CHECKUP;
    };
    AppComponent.prototype.initEVisitState = function () {
        this.eVisitState = {
            IN_AN_EVISIT: false,
            currDoctorProfile: {},
            currEvisitId: "",
            currOpentokToken: "",
            currOpentokSessionId: "",
            currOpentokApiKey: ""
        };
    };
    AppComponent.prototype.getUserProfileByUserId = function (userId, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.sharedService.ajaxGetCall(this.URL_GET_USER_PROFILE + "?user_id=" + encodeURI(userId), this.auth0Headers, function (response) {
                    callback(response.body);
                });
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.getDoctorProfileByUserId = function (userId, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.sharedService.ajaxGetCall(this.URL_GET_DRCHRONO_DOCTOR_PROFILE + "?doc_id=" + encodeURI(userId), this.auth0Headers, function (response) {
                    callback(response.body);
                });
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.findDoctors = function () {
        var _this = this;
        this.setStartedAtTimestamp();
        this.lookingUpDoctorsBool = true;
        this.fetchingListCompleteBool = false;
        this.changeRef.detectChanges();
        if (this.takingReadingBool) {
            this.snackBar.open("Currently Taking a reading ... ", "", { duration: 2000 });
        }
        $(".tv-div-div").css("width", this.tvWidth + "px");
        $(".tv-div-div").css("height", (0.85 * this.tvHeight) + "px");
        $(".tv-div-div").css("overflow", "auto");
        this.mainTvMessage = "Finding Doctors ... ";
        this.currTvView = this.TV_VIEW_EVISIT_FETCHING_ONLINE_DOCTORS;
        this.doctorsProfileList = [];
        this.doctorsEVisitInfoList = [];
        //console.log(this.URL_GET_DOCTORS_LIST + ", ", this.auth0Headers);
        this.sharedService.ajaxGetCall(this.URL_GET_ONLINE_DOCTORS_LIST, this.auth0Headers, function (response) {
            if (_this.lastOperationCancelledAt > _this.lastOperationStartedAt) {
                console.log("Recently Cancelled EVisit. Ignoring Response for finding Doctors");
                return;
            }
            _this.fetchingListCompleteBool = true;
            _this.changeRef.detectChanges();
            console.log(response);
            _this.doctorsEVisitInfoList = JSON.parse(response.body);
            var i = 0;
            _this.doctorsEVisitInfoList.forEach(function (item) {
                var docId = encodeURI(item.doc_id);
                var position = i;
                _this.getDocProfileAndAddToListAt(position, docId);
                i++;
            });
            console.log(_this.doctorsEVisitInfoList);
            _this.mainTvMessage = "Doctor's List Ready";
            _this.currTvView = _this.TV_VIEW_EVISIT_ONLINE_DOCTORS_LIST_READY;
            if (_this.doctorsEVisitInfoList.length == 0) {
                //this.snackBar.open("No Doctors Online Right Now. Please Try Again Later ... ","", {duration: 3000});
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.initHome();
                        return [2 /*return*/];
                    });
                }); }, 4000);
                return;
            }
        }, function (error) {
            console.log("Error: ", error);
            _this.fetchingListCompleteBool = true;
        });
    };
    AppComponent.prototype.getDocProfileAndAddToListAt = function (position, docId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("Getting user profile for " + docId + " for position " + position);
                if (docId.includes("drchrono")) {
                    this.getDoctorProfileByUserId(docId, function (profile) {
                        var profileJson = JSON.parse(profile)[0];
                        console.log("User Profile for ", docId, profile);
                        if (_this.lastOperationCancelledAt > _this.lastOperationStartedAt) {
                            console.log("Recently Cancelled EVisit. Ignoring adding profile to online doc profile list");
                            return;
                        }
                        profileJson.doc_id = profileJson.drchrono_doc_id;
                        _this.addDocProfileToList(position, profileJson);
                    });
                }
                else {
                    this.getUserProfileByUserId(docId, function (profileJsonStr) {
                        console.log("User Profile for ", docId, profileJsonStr);
                        var profileJson = JSON.parse(profileJsonStr);
                        if (_this.lastOperationCancelledAt > _this.lastOperationStartedAt) {
                            console.log("Recently Cancelled EVisit. Ignoring adding profile to online doc profile list");
                            return;
                        }
                        profileJson.full_name = profileJson.name;
                        profileJson.doc_id = profileJson.user_id;
                        _this.addDocProfileToList(position, profileJson);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.addDocProfileToList = function (i, docInfo) {
        console.log("placing doctor profile at position: " + i + " ... ", docInfo);
        //this.doctorsProfileList[i] = docInfo;
        console.log(docInfo);
        this.doctorsProfileList.push(docInfo);
    };
    ;
    AppComponent.prototype.enqueueToThisDoctor = function (requestedDocProfile) {
        var _this = this;
        console.log("Setting State: IN_AN_EVISIT");
        this.eVisitState.IN_AN_EVISIT = true;
        this.eVisitState.currDoctorProfile = requestedDocProfile;
        console.log("requesting doctor profile: ", requestedDocProfile);
        this.mainTvMessage = "Requesting Doctor " + requestedDocProfile.full_name;
        this.currTvView = this.TV_VIEW_EVISIT_REQUESTING_LIST_READY;
        // changed to adapt for drchrono
        //var data = {doc_id: requestedDocProfile.user_id};
        var data = { doc_id: requestedDocProfile.doc_id };
        console.log("Data: ", data);
        this.sharedService.ajaxPostCall(this.URL_POST_PATIENT_ENQUEUE, data, this.auth0Headers, function (response) {
            if (_this.lastOperationCancelledAt > _this.lastOperationStartedAt) {
                console.log("Recently Cancelled EVisit. Ignoring Response For Enqueuing");
                return;
            }
            console.log(response.body);
            // enqueued success
            if (response.body.includes("SUCCESS")) {
                var evisitId = response.body.split("^^")[1];
                _this.eVisitState.currEvisitId = evisitId;
                console.log("EvisitId: " + evisitId);
                _this.waitForDoctorToLetMeIn(requestedDocProfile, evisitId);
            }
            else if (response.body.includes("ALREADY_ENQUEUED")) {
                var evisitId = response.body.split("^^")[1];
                _this.eVisitState.currEvisitId = evisitId;
                console.log("EvisitId: " + evisitId);
                _this.waitForDoctorToLetMeIn(requestedDocProfile, evisitId);
            }
            else {
                // TODO
            }
        });
    };
    AppComponent.prototype.waitForDoctorToLetMeIn = function (requestedDocProfile, evisitId) {
        var _this = this;
        this.currEvisitPosition = -1;
        this.hasDoctorToLetMeIn(requestedDocProfile, evisitId);
        this.waitingInterval = setInterval(function () {
            _this.hasDoctorToLetMeIn(requestedDocProfile, evisitId);
        }, 10000);
    };
    AppComponent.prototype.hasDoctorToLetMeIn = function (requestedDocProfile, evisitId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var docId;
            return __generator(this, function (_a) {
                console.log(requestedDocProfile);
                this.mainTvMessage = "In Live Session with Doctor: " + requestedDocProfile.name;
                this.currTvView = this.TV_VIEW_EVISIT_IN_WAITING_ROOM;
                docId = encodeURI(requestedDocProfile.doc_id);
                this.sharedService.ajaxGetCall(this.URL_GET_HAS_EVISIT_BEGUN + "?evisit_id=" + evisitId + "&doc_id=" + docId, this.auth0Headers, function (response) {
                    if (_this.lastOperationCancelledAt > _this.lastOperationStartedAt) {
                        console.log("Recently Cancelled EVisit. Ignoring Response for checking if doctor has let me in");
                        return;
                    }
                    if (response.body.includes("IN_SESSION")) {
                        var responseParts = response.body.split("^^");
                        var opentokSessionId = decodeURIComponent(responseParts[1]);
                        var opentokToken = decodeURIComponent(responseParts[2]);
                        var opentokApiKey = decodeURIComponent(responseParts[3]);
                        _this.eVisitState.currOpentokSessionId = opentokSessionId;
                        _this.eVisitState.currOpentokToken = opentokToken;
                        _this.eVisitState.currOpentokApiKey = opentokApiKey;
                        console.log("Clearing Interval for: check if doc has let me in");
                        console.log(_this.eVisitState);
                        clearInterval(_this.waitingInterval);
                        _this.enterEVisit(opentokApiKey, opentokSessionId, opentokToken);
                    }
                    else if (response.body.includes("NOPE")) {
                        var responseParts = response.body.split("^^");
                        _this.currEvisitPosition = parseInt(responseParts[1]);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.cancelEVisit = function () {
        /*
        this.evisitIFrameUrl = "about:blank";
        this.recentlyCancelledEVisit = true;
        this.eVisitState.IN_AN_EVISIT = false;
        this.initHome();
        */
        this.resetEverything();
    };
    AppComponent.prototype.resetEverything = function () {
        this.setCancelledAtTimestamp();
        setTimeout(function () {
            location.reload();
        }, 500);
    };
    AppComponent.prototype.enterEVisit = function (opentokApiKey, opentokSessionId, opentokToken) {
        var _this = this;
        this.currTvView = this.TV_VIEW_EVISIT_IN_SESSION;
        this.evisitIFrameUrl = this.sharedService.getOpenTokUrl(opentokApiKey, opentokSessionId, opentokToken, this.tvWidth, this.tvHeight);
        setTimeout(function () {
            $(_this.evisitIFrame.nativeElement).attr("src", _this.evisitIFrameUrl);
            $(_this.evisitIFrame.nativeElement).attr("width", _this.tvWidth);
            $(_this.evisitIFrame.nativeElement).attr("height", _this.tvHeight);
            _this.evisitIFrame.nativeElement.style.width = _this.tvWidth;
            _this.evisitIFrame.nativeElement.style.height = _this.tvHeight;
        }, 2000);
        this.evisitCompletedPolling();
    };
    AppComponent.prototype.evisitCompletedPolling = function () {
        var _this = this;
        this.evisitPollingInterval = setInterval(function () {
            var evisitId = _this.eVisitState.currEvisitId;
            console.log("Checking if evisit ended for evisitId: " + evisitId);
            if (_this.eVisitState.currEvisitId == "") {
                console.log("evisitid empty");
                return;
            }
            _this.sharedService.ajaxGetCall(_this.URL_GET_EVISIT_STATE + "?evisit_id=" + evisitId, _this.auth0Headers, function (response) {
                if (_this.lastOperationCancelledAt > _this.lastOperationStartedAt) {
                    console.log("Recently Cancelled EVisit. Ignoring Response For checking evisit completed!");
                    return;
                }
                if (!response.body.includes("IN_SESSION")) {
                    console.log("Not In session anymore!");
                    clearInterval(_this.evisitPollingInterval);
                    _this.onEvisitEnded();
                }
            });
        }, 10000);
    };
    AppComponent.prototype.onEvisitEnded = function () {
        console.log("Evisit ended!");
        this.evisitIFrameUrl = "about:blank";
        this.initEVisitState();
        this.resetEverything();
    };
    AppComponent.prototype.toastThis = function (str) {
        console.log("Toasting: " + str);
        this.snackBar.open(str, '', { duration: 2000 });
    };
    AppComponent.prototype.takeReading = function (vital) {
        if (this.takingReadingBool) {
            this.snackBar.open("Currently Taking " + this.sharedService.getVitalStr(this.currVitalType) + ". Please Wait ... ", "", { duration: 2000 });
            return;
        }
        this.takingReadingBool = true;
        this.currVitalType = vital;
        switch (vital) {
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
                this.currVitalDeviceModelInfo = this.deviceListService.andBpUa651DeviceInfo;
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
    };
    AppComponent.prototype.getCurrentTimestamp = function () {
        return this.sharedService.getCurrentTimestamp();
    };
    // checking this value all operations will cancel in the underlying java layer
    AppComponent.prototype.cancelBtOperation = function () {
        this.setCancelledAtTimestamp();
    };
    AppComponent.prototype.checkDeviceRegistration = function () {
        this.currRegisteredDeviceInfo = undefined;
        this.currVitalReadingView = this.VITAL_VIEW_CHECKING_REGISTRATION;
        var regVital = this.getRegisteredDeviceInfo(this.currVitalType);
        console.log(typeof regVital + " ... ", regVital);
        if (regVital == "" || typeof regVital == "undefined" || regVital == "undefined") {
            console.log("Device NOT Registered ... ");
            this.currVitalReadingView = this.VITAL_VIEW_NOT_REGISTERED;
        }
        else {
            console.log("Device Already Registered ... ", regVital);
            var regVitalJson = JSON.parse(regVital);
            var btMac = regVitalJson.mac;
            var btName = regVitalJson.btname;
            if (typeof btMac == "undefined") {
                console.log("... but mac Undefined ... unregistering");
                this.unregisterDevice(this.currVitalType);
                this.currVitalReadingView = this.VITAL_VIEW_NOT_REGISTERED;
                return;
            }
            console.log("currVitalDeviceInfo: ", this.currVitalDeviceModelInfo);
            var currDeviceModelInfo = this.currVitalDeviceModelInfo;
            var currDeviceCommType = currDeviceModelInfo.di_device_comm.comm_type;
            var currDevicePairingNeeded = currDeviceModelInfo.di_device_comm.di_comm_info.di_pairing_info.pairing_needed;
            if (currDevicePairingNeeded) {
                if (!JV_BTReadings.isBtDevicePaired(btMac)) {
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
    };
    AppComponent.prototype.cancelRegistration = function () {
        console.log("Cancelling Registration of New Device.");
        this.cancelBtOperation();
        //this.resetEverything();
        this.takingReadingBool = false;
        this.currTvView = this.TV_VIEW_HOME;
        this.currVitalReadingView = this.VITAL_VIEW_CHECKING_REGISTRATION;
        ;
    };
    AppComponent.prototype.setVitalReadingMiniMesg = function (mesg) {
        this.vitalReadingMiniMesg = mesg;
    };
    AppComponent.prototype.lookupDevices = function (devModelInfo) {
        console.log(devModelInfo);
        var btNamePrefix = devModelInfo.di_device_comm.di_comm_info.bt_name;
        console.log("Looking up " + btNamePrefix);
        this.devicesDiscovered = [];
        this.currVitalReadingView = this.VITAL_VIEW_BT_PAIRING_LOOKUP;
        var currDeviceModelInfo = this.currVitalDeviceModelInfo;
        var currDeviceCommType = currDeviceModelInfo.di_device_comm.comm_type;
        var currDevicePairingNeeded = currDeviceModelInfo.di_device_comm.di_comm_info.di_pairing_info.pairing_needed;
        if (currDeviceCommType == "BT_SPP") {
            console.log("PAIRING NEEDED ... ");
            JV_BTReadings.discoverBtDevices(btNamePrefix);
        }
        else if (currDeviceCommType == "BT_LE") {
            if (currDevicePairingNeeded) {
                console.log("PAIRING NEEDED ... ");
                JV_BTReadings.discoverBtDevices(btNamePrefix);
            }
            else {
                console.log("PAIRING NOT NEEDED ... ");
                JV_BTReadings.scanBleDevices(btNamePrefix);
            }
        }
        else if (currDeviceCommType == "NFC") {
        }
    };
    AppComponent.prototype.onSppDevicesDiscovered = function (deviceList) {
        console.log("Devices Discovered: ", deviceList);
        this.devicesDiscovered = deviceList;
        this.currVitalReadingView = this.VITAL_VIEW_BT_SPP_DEVICES_FOUND;
    };
    // BLE METHODS
    AppComponent.prototype.onBleDevicesDiscovered = function (deviceList) {
        console.log("BLE Devices Discovered: ", deviceList);
        this.devicesDiscovered = deviceList;
        this.currVitalReadingView = this.VITAL_VIEW_BT_BLE_DEVICES_FOUND;
    };
    AppComponent.prototype.createBluetoothBond = function (devInfo) {
        console.log("Pairing with device: ", devInfo);
        if (devInfo.paired) {
            console.log("Already Paired. Registering ... ", devInfo);
            this.registerDevice(devInfo);
            return;
        }
        this.currVitalReadingView = this.VITAL_VIEW_BT_PAIRING_ATTEMPT;
        var mac = devInfo.mac;
        var btname = devInfo.btname;
        var pin = this.deviceListService.getPairingPinFor(devInfo.btname);
        JV_BTReadings.pairWithThisDevice(btname, mac, pin);
    };
    AppComponent.prototype.onPairingFailed = function (devInfoJson) {
        this.currVitalReadingView = this.VITAL_VIEW_BT_PAIRING_FAILED;
        console.log("Pairing Failed ... ", devInfoJson);
    };
    AppComponent.prototype.onPairingSuccess = function (devInfoJson) {
        this.currVitalReadingView = this.VITAL_VIEW_BT_PAIRING_SUCCESS;
        console.log("Pairing Succeeded! ", devInfoJson);
        this.registerDevice(devInfoJson);
    };
    AppComponent.prototype.registerDevice = function (devInfo) {
        var _this = this;
        this.currVitalReadingView = this.VITAL_VIEW_BT_REGISTERING;
        console.log("Registering Device: ", devInfo);
        this.saveRegistrationDeviceInfo(this.currVitalType, JSON.stringify(devInfo));
        console.log("From pref:" + this.getRegisteredDeviceInfo(this.currVitalType));
        this.currRegisteredDeviceInfo = devInfo;
        setTimeout(function () {
            _this.currVitalReadingView = _this.VITAL_VIEW_BT_REGISTERED;
            setTimeout(function () {
                _this.resetEverything();
            }, 2000);
        }, 1000);
    };
    AppComponent.prototype.unregisterDevice = function (vitalType) {
        this.saveRegistrationDeviceInfo(vitalType, "");
    };
    AppComponent.prototype.getRegisteredDeviceInfo = function (vitalType) {
        return JV_SharedPreferences.getString("REG_VITAL_" + this.currVitalType);
    };
    AppComponent.prototype.saveRegistrationDeviceInfo = function (vitalType, vitalDevInfoJsonStr) {
        JV_SharedPreferences.setString("REG_VITAL_" + this.currVitalType, vitalDevInfoJsonStr);
    };
    AppComponent.prototype.connectToCurrDevice = function () {
        console.log("currVitalDeviceInfo: ", this.currVitalDeviceModelInfo);
        this.setVitalReadingMiniMesg("");
        var currDeviceModelInfo = this.currVitalDeviceModelInfo;
        var currDeviceCommType = currDeviceModelInfo.di_device_comm.comm_type;
        if (currDeviceCommType == "BT_SPP") {
            var mac = this.currRegisteredDeviceInfo.mac;
            var btname = this.currRegisteredDeviceInfo.btname;
            console.log("Connecting to Device: " + mac + " (" + btname + ")");
            this.connectToSppDevice(mac, btname);
        }
        else if (currDeviceCommType == "BT_LE") {
            var mac = this.currRegisteredDeviceInfo.mac;
            var btname = this.currRegisteredDeviceInfo.btname;
            console.log("Connecting to Device: " + mac + " (" + btname + ")");
            this.connectToBleDevice(mac, btname);
        }
    };
    AppComponent.prototype.connectToSppDevice = function (mac, btname) {
        var _this = this;
        console.log("Connecting to SPP Device " + btname + " (" + mac + ")");
        var currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter(function (item) {
            return item.di_usage_instruction.at == "WAITING_FOR_CONNECTION";
        })[0];
        console.log("Curr WAITING_FOR_CONNECTION Instruction: ", currInstruction);
        this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
        console.log("Curr Instruction Image: " + this.currInstructionImageUrl);
        this.currVitalReadingView = this.VITAL_VIEW_CONNECTING;
        this.setMainMessage(currInstruction.di_usage_instruction.text);
        this.speak(currInstruction.di_usage_instruction.voice);
        this.changeRef.detectChanges();
        setTimeout(function () {
            JV_BTReadings.connectToSppDevice(mac, btname, _this.currVitalType);
        }, 100);
    };
    AppComponent.prototype.connectToBleDevice = function (mac, btname) {
        var _this = this;
        console.log("Connecting to BLE Device " + btname + " (" + mac + ")");
        var currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter(function (item) {
            return item.di_usage_instruction.at == "WAITING_FOR_CONNECTION";
        })[0];
        console.log("Curr WAITING_FOR_CONNECTION Instruction: ", currInstruction);
        this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
        console.log("Curr Instruction Image: " + this.currInstructionImageUrl);
        this.currVitalReadingView = this.VITAL_VIEW_CONNECTING;
        this.setMainMessage(currInstruction.di_usage_instruction.text);
        this.speak(currInstruction.di_usage_instruction.voice);
        this.changeRef.detectChanges();
        setTimeout(function () {
            JV_BTReadings.connectToBleDevice(mac, btname, _this.currVitalType);
        }, 100);
    };
    AppComponent.prototype.onSppDeviceNotPairedForConnect = function (devInfo) {
        console.log("Connected to Device: " + devInfo.mac + " (" + devInfo.btname + ")");
        this.currVitalReadingView = this.VITAL_VIEW_SPP_NOT_PAIRED;
        this.setMainMessage("Unregistering Device ... ");
        this.unregisterDevice(this.currVitalType);
        this.setMainMessage("Device Unregistered!");
        this.lookupDevices(this.currVitalDeviceModelInfo);
        return;
    };
    AppComponent.prototype.onSppVitalConnected = function (devInfo) {
        console.log("Connected to Device: " + devInfo.mac + " (" + devInfo.btname + ")");
        var currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter(function (item) {
            return item.di_usage_instruction.at == "CONNECTED";
        })[0];
        console.log("Curr CONNECTED Instruction: ", currInstruction);
        this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
        console.log("Curr Instruction Image: " + this.currInstructionImageUrl);
        this.currVitalReadingView = this.VITAL_VIEW_CONNECTED;
        this.setMainMessage(currInstruction.di_usage_instruction.text);
        this.speak(currInstruction.di_usage_instruction.voice);
        this.changeRef.detectChanges();
    };
    AppComponent.prototype.onBleVitalConnected = function (devInfo) {
        console.log("Connected to Device: " + devInfo.mac + " (" + devInfo.btname + ")");
        var currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter(function (item) {
            return item.di_usage_instruction.at == "CONNECTED";
        })[0];
        console.log("Curr CONNECTED Instruction: ", currInstruction);
        this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
        console.log("Curr Instruction Image: " + this.currInstructionImageUrl);
        this.currVitalReadingView = this.VITAL_VIEW_CONNECTED;
        this.setMainMessage(currInstruction.di_usage_instruction.text);
        this.speak(currInstruction.di_usage_instruction.voice);
        this.changeRef.detectChanges();
    };
    AppComponent.prototype.onVitalReadingFinished = function (vitalType, finalReadingMesg) {
        var _this = this;
        this.finalReadingMesg = finalReadingMesg;
        var currInstruction = this.currVitalDeviceModelInfo.di_usage_instruction_set.filter(function (item) {
            return item.di_usage_instruction.at == "FINISHED";
        })[0];
        console.log("Curr FINISHED Instruction: ", currInstruction);
        console.log("finalReadingMesg: " + this.finalReadingMesg);
        this.currInstructionImageUrl = currInstruction.di_usage_instruction.img_src;
        console.log("Curr Instruction Image: " + this.currInstructionImageUrl);
        this.setMainMessage(currInstruction.di_usage_instruction.text);
        this.speak(currInstruction.di_usage_instruction.voice);
        this.currVitalReadingView = this.VITAL_VIEW_FINISHED;
        setTimeout(function () {
            _this.currVitalReadingView = _this.VITAL_VIEW_FINISHED_SHOW_FINAL_READING;
            setTimeout(function () {
                _this.takingReadingBool = false;
                if (!_this.eVisitState.IN_AN_EVISIT) {
                    _this.initHome();
                }
                else {
                    // TODO: here
                }
            }, 7000);
        }, 5000);
    };
    AppComponent.prototype.onVitalReadingTimeout = function (vitalType) {
        var _this = this;
        this.currVitalReadingView = this.VITAL_VIEW_TIMEOUT;
        this.currErrorMesg = "Please Try Again Later";
        setTimeout(function () {
            _this.takingReadingBool = false;
            _this.initHome();
        }, 5000);
    };
    AppComponent.prototype.onVitalReadingError = function (vitalType, errorMesg) {
        var _this = this;
        this.currVitalReadingView = this.VITAL_VIEW_ERROR;
        if (errorMesg == "DEVICE_DRIVER_NOT_FOUND") {
            this.currErrorMesg = "Device Driver Not Found";
        }
        else {
            this.currErrorMesg = "Please Try Again Later";
        }
        setTimeout(function () {
            _this.takingReadingBool = false;
            _this.initHome();
        }, 5000);
    };
    //////////// VIEW CHARTS ////////////////
    AppComponent.prototype.viewCharts = function () {
        console.log("viewCharts()");
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 10;
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 10;
        var dialogRef = this.dialog.open(VitalChartsDialog, {
            width: w + "px",
            height: h + "px",
            disableClose: true,
            data: { charts_url: this.URL_VITAL_CHARTS }
        });
    };
    AppComponent.prototype.closeCharts = function () {
        console.log("closeCharts()");
    };
    AppComponent.prototype.takePhoto = function () {
        var _this = this;
        console.log("takePhoto()");
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 10;
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 10;
        var dialogRef = this.dialog.open(PhotoDialog, {
            width: w + "px",
            height: h + "px",
            disableClose: true,
            data: { w: w, h: h }
        });
        dialogRef.afterOpen().subscribe(function (result) {
            console.log("Photo Dialog Opened");
            _this.takingPhoto = true;
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Photo Dialog Closed");
            _this.takingPhoto = false;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('tvTd'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "tvTd", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('tvTopDiv'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "tvTopDiv", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('tvMesgDiv'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "tvMesgDiv", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('evisitIFrame'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "evisitIFrame", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app/app.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatSnackBar */], __WEBPACK_IMPORTED_MODULE_2__services_shared_service_service__["a" /* SharedService */],
            __WEBPACK_IMPORTED_MODULE_3__services_java_call_service__["a" /* JavaCallService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_4__services_devicelist_service__["a" /* DevicelistService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatDialog */]])
    ], AppComponent);
    return AppComponent;
}());

var VitalChartsDialog = (function () {
    function VitalChartsDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.charts_url = "";
        this.w = 200;
        this.h = 200;
        this.charts_url = data.charts_url;
        console.log("Opening " + this.charts_url);
    }
    VitalChartsDialog.prototype.ngAfterViewInit = function () {
        var vd = $(".mat-dialog-container");
        console.log(vd.width() + "x" + vd.height());
        this.w = Math.floor(vd.width() * 0.97);
        this.h = Math.floor(vd.height() * 0.83);
        this.charts_url = this.charts_url + "&w=" + this.w + "&h=" + this.h;
        this.loadCharts();
    };
    VitalChartsDialog.prototype.onNoClick = function () {
        //this.dialogRef.close();
    };
    VitalChartsDialog.prototype.refreshCharts = function () {
        console.log("Refreshing Charts ... ");
        this.loadCharts();
    };
    VitalChartsDialog.prototype.loadCharts = function () {
        var iframeElement = this.chartsIframe.nativeElement;
        iframeElement.src = this.charts_url;
        console.log("Loading Charts URL: " + this.charts_url);
    };
    VitalChartsDialog.prototype.closeCharts = function () {
        this.dialogRef.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])("chartsIframe"),
        __metadata("design:type", Object)
    ], VitalChartsDialog.prototype, "chartsIframe", void 0);
    VitalChartsDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'vital-charts-dialog',
            template: "\n    <iframe #chartsIframe [width]=\"w\" [height]=\"h\" [style.width]='w' [style.height]='h' [src]=\"\"  frameborder=\"0\" allowfullscreen=\"no\"></iframe>\n    <button mat-button color=\"primary\" (click)='refreshCharts();'><i class=\"fas fa-sync\"></i> <span>Refresh</span></button>\n    <button mat-button color=\"warn\" (click)='closeCharts();'><i class=\"fas fa-window-close\"></i> <span>Close</span></button>\n  ",
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatDialogRef */], Object])
    ], VitalChartsDialog);
    return VitalChartsDialog;
}());

var PhotoDialog = (function () {
    function PhotoDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.charts_url = "";
        this.w = 200;
        this.h = 200;
        this.videoW = 200;
        this.videoH = 200;
        this.captureW = 800;
        this.captureH = 600;
        this.startedVideo = false;
        this.photoCaptured = false;
        this.videoDevices = [];
        this.currCamIndex = 1;
        this.w = data.w;
        this.h = data.h - 20;
        this.videoW = this.w * 0.73;
        this.videoH = this.h * 0.75;
    }
    PhotoDialog.prototype.onNoClick = function () {
        //this.dialogRef.close();
    };
    PhotoDialog.prototype.ngAfterViewInit = function () {
        this.startedVideo = false;
        this.photoCaptured = false;
        this.currCamIndex = 1;
        this.videoDevices = [];
        this.getDeviceList();
    };
    PhotoDialog.prototype.getDeviceList = function () {
        var _this = this;
        navigator.mediaDevices.enumerateDevices()
            .then(function (devices) {
            _this.videoDevices = devices.filter(function (item) { return item.kind === 'videoinput'; });
            console.log(_this.videoDevices);
            _this.startCameraStream();
        })
            .catch(function (error) { });
    };
    PhotoDialog.prototype.getVideoElement = function () {
        var videoEl;
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
    };
    PhotoDialog.prototype.startCameraStream = function () {
        var _this = this;
        var camIndex = this.currCamIndex;
        var facingMode = "";
        if (this.videoDevices.length > 1) {
            if (camIndex == 0) {
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
        this.videoConstraints = {
            // width: this.captureW,
            // height: this.captureH,
            frameRate: { ideal: 10, max: 15 },
            facingMode: facingMode,
            deviceId: { exact: this.videoDevices[this.currCamIndex].deviceId }
        };
        var videoEl = this.getVideoElement();
        this.killAllTracks();
        setTimeout(function () {
            navigator.mediaDevices.getUserMedia({ video: _this.videoConstraints })
                .then(function (stream) {
                _this.currStream = stream;
                videoEl.setAttribute("src", window.URL.createObjectURL(stream));
                console.log(videoEl.src);
                _this.startedVideo = true;
            })
                .catch(function (err) {
                console.error(err);
            });
        }, 200);
    };
    PhotoDialog.prototype.switchCamera = function () {
        console.log(" ");
        if (this.currCamIndex == 0) {
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
    };
    PhotoDialog.prototype.killAllTracks = function () {
        if (typeof this.currStream != "undefined") {
            this.currStream.getTracks().forEach(function (track) {
                console.log("Stopping Track: ", track);
                track.stop();
            });
        }
    };
    PhotoDialog.prototype.clickPhoto = function () {
        var _this = this;
        var videoEl = this.getVideoElement();
        //console.log(videoEl.camera_stream);
        var canvas = document.createElement('canvas');
        canvas.width = videoEl.width;
        canvas.height = videoEl.height;
        canvas.style.width = videoEl.width;
        canvas.style.height = videoEl.height;
        var context = canvas.getContext("2d");
        context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        var imageDataURL = canvas.toDataURL('image/png');
        console.log(imageDataURL);
        console.log("Photo Captured");
        this.photoCaptured = true;
        setTimeout(function () {
            var imgW = (640 * _this.videoH / 480);
            console.log("imgW: " + imgW);
            _this.imgElement.nativeElement.width = imgW;
            _this.imgElement.nativeElement.style.width = imgW;
            _this.imgElement.nativeElement.height = _this.videoH;
            _this.imgElement.nativeElement.style.height = _this.videoH;
            _this.imgElement.nativeElement.src = imageDataURL;
        }, 50);
    };
    PhotoDialog.prototype.savePhoto = function () {
        var photoB64 = this.imgElement.nativeElement.src;
        JV_BTReadings.savePhoto(photoB64);
        this.closePhoto();
    };
    PhotoDialog.prototype.cancelSavePhoto = function () {
    };
    PhotoDialog.prototype.closePhoto = function () {
        this.dialogRef.close();
    };
    PhotoDialog.prototype.ngOnDestroy = function () {
        console.log("Picture Dialog Destroyed");
        this.killAllTracks();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])("captureVideo0"),
        __metadata("design:type", Object)
    ], PhotoDialog.prototype, "captureVideo0Element", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])("img"),
        __metadata("design:type", Object)
    ], PhotoDialog.prototype, "imgElement", void 0);
    PhotoDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'photo-dialog',
            template: "\n    <style> \n      .hcenter {\n        display: flex;\n        align-items: center;\n        justify-content: center\n      }\n      /*img {\n        display: inline-block;\n        width: auto;\n      }*/\n    </style>\n    \n    <video #captureVideo0 style='border: 0px solid #000' *ngIf=\"!photoCaptured\" [width]=\"videoW\" [height]=\"videoH\" [style.width]=\"videoW\" [style.height]=\"videoH\" autoplay></video>   \n\n    <!--\n    <video *ngIf=\"currCamIndex==0\" #captureVideo0 style='border: 0px solid #000' *ngIf=\"!photoCaptured\" [width]=\"videoW\" [height]=\"videoH\" [style.width]=\"videoW\" [style.height]=\"videoH\" autoplay></video>   \n    <video *ngIf=\"currCamIndex==1\" #captureVideo1 style='border: 0px solid #000' *ngIf=\"!photoCaptured\" [width]=\"videoW\" [height]=\"videoH\" [style.width]=\"videoW\" [style.height]=\"videoH\" autoplay></video>   \n    -->\n    \n    <div class='hcenter' [style.width]=\"videoW\" [style.height]=\"videoH\">\n      <img #img [style.height]=\"videoH\" *ngIf=\"photoCaptured\" />   \n    </div>\n    \n    <br />\n\n    <div class='hcenter' [style.width]=\"videoW\">\n      <button *ngIf=\"videoDevices.length > 1\" mat-raised-button color=\"primary\" (click)=\"switchCamera()\">\n          <i class=\"fas fa-sync\"></i> Switch Cams\n      </button> \n      &nbsp; &nbsp;\n      <button *ngIf=\"startedVideo && !photoCaptured\" mat-raised-button color=\"primary\" (click)=\"clickPhoto()\">\n          <i class=\"fas fa-camera\"></i> Capture\n      </button> \n      &nbsp; &nbsp;\n      <button *ngIf=\"photoCaptured\" mat-raised-button color=\"primary\" (click)=\"savePhoto()\">\n          <i class=\"fas fa-download\"></i> Save Photo\n      </button> \n      &nbsp; &nbsp;\n      <button mat-raised-button color=\"warn\" (click)=\"closePhoto()\">\n          <i class=\"fas fa-window-close\"></i> Close\n      </button>\n    </div>\n  ",
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatDialogRef */], Object])
    ], PhotoDialog);
    return PhotoDialog;
}());



/***/ }),

/***/ "../../../../../src/app/chf-checkup/chf-checkup.component.html":
/***/ (function(module, exports) {

module.exports = "<style>\n.centered, mat-spinner {\n    margin: auto;\n}\n</style>\n\n<div #chfCheckup [style.width]=\"width\" [style.height]=\"height\">\n  \n  <div *ngIf=\"!vitalsAvailable\">\n    <h3>Fetching Latest Vitals Please Wait ... </h3>\n    <mat-spinner [diameter]=\"50\" class=\"centered\"></mat-spinner>\n  </div>\n  \n  <table *ngIf=\"!checkupCompleted && currQuestion!=undefined\" width=\"100%\" height=\"100%\">\n    <tr>\n      <td width=\"50%\">\n        <b>Check Up!</b>\n        <h3>{{currQuestion.long_text}}</h3>\n        <button mat-raised-button color=\"primary\" (click)=\"setAnswer(false, currQuestion.id)\">No</button>\n        &nbsp;\n        <button mat-raised-button color=\"warn\" (click)=\"setAnswer(true, currQuestion.id)\">Yes</button>\n        \n        <div style=\"height:15px;\"></div>\n        \n        <button mat-raised-button  (click)=\"cancelCheckup()\">Cancel Checkup</button>\n        \n      </td>\n      <td width=\"50%\">\n        <div valign=\"top\" [style.height]=\"height\" style=\"display:block;text-align:left;overflow-y:auto;vertical-align:top;\">\n              <b>Answers ...</b>\n              <div *ngFor=\"let ans of answerValues\">\n                {{ans.question.short_text}}: {{ans.answer}}\n              </div>\n\n        </div>\n      </td>\n    </tr>\n  </table>\n\n  <div *ngIf=\"checkupCompleted\">\n\n      <div *ngIf=\"instructionList.length == 0\">\n        <h3>Everything looks good!</h3>\n        <i class=\"fas fa-thumbs-up\"></i>\n      </div>\n\n      <div *ngIf=\"instructionList.length > 0\">\n        <h4>Instructions For The Patient</h4>\n\n        <div [style.width]=\"width*0.5\" class=\"centered\">\n          <div style=\"font-size:120%; text-align:center;\" *ngFor=\"let instruction of instructionList\">\n            {{instruction.text}}\n            <span *ngIf=\"instruction.type=='video'\">\n              <button mat-raised-button (click)=\"openYoutubeDialog(instruction.obj)\">\n                Watch How To: <i class=\"fab fa-youtube\"></i>\n              </button>\n            </span>\n          </div>\n        </div>\n      </div>\n      \n\n\n      <br />\n      <button mat-raised-button  (click)=\"cancelCheckup()\">Close</button>\n\n  </div>\n  \n\n</div>"

/***/ }),

/***/ "../../../../../src/app/chf-checkup/chf-checkup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChfCheckupComponent; });
/* unused harmony export Instruction */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return YoutubeDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_service_service__ = __webpack_require__("../../../../../src/app/services/shared-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enum_threshold_function__ = __webpack_require__("../../../../../src/app/chf-checkup/enum-threshold-function.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ChfCheckupComponent = (function () {
    function ChfCheckupComponent(dialog, sharedService, changeRef) {
        this.dialog = dialog;
        this.sharedService = sharedService;
        this.changeRef = changeRef;
        this.width = 600;
        this.height = 400;
        this.currWeight = 0.0;
        this.currWeightTimestamp = -1;
        this.currO2Sat = 0.0;
        this.currO2SatTimestamp = -1;
        this.currQuestion = undefined;
        this.questionList = [];
        this.answerList = [];
        this.instructionList = [];
        this.patientVitalThresholdCriteria = [];
        this.patientVitalAgeCriteria = [];
        this.checkupCompleted = false;
        this.SERVER_BASE_URL = this.sharedService.SERVER_BASE_URL;
        this.URL_FETCH_VITALS = this.SERVER_BASE_URL + "/vitals/last30days";
        this.vitalsAvailable = false;
        this.heavyMealBool = false;
        this.swellingBool = false;
        this.checkWeightLogicCompleted = false;
        //readonly URL_NEBULIZER_YOUTUBE = "https://www.youtube.com/v/TrFBgzha2QQ?version=3&controls=0&rel=0&autoplay=1&iv_load_policy=3&start=29&end=160";
        this.URL_NEBULIZER_YOUTUBE = "assets/video/nebulizer.mp4";
        this.shortnessOfBreath = false;
        this.workoutOrLabor = false;
        this.spo2LogicComplete = false;
        this.redLogicCompleted = false;
        this.answerValues = [];
        this.checkupCompleted = false;
        this.instructionList = [];
        this.initQuestionList();
        this.initPatientThresholdCriteria();
        this.initPatientVitalAgeCriteria();
    }
    ChfCheckupComponent.prototype.log = function (obj1, obj2) {
        if (obj2 == undefined) {
            console.log("ChfCheckupComponent: " + obj1);
        }
        else {
            console.log("ChfCheckupComponent: " + obj1, obj2);
        }
    };
    ChfCheckupComponent.prototype.ngOnInit = function () {
    };
    ChfCheckupComponent.prototype.ngAfterViewInit = function () {
        this.log("afterViewInit()");
        this.startCheckup();
    };
    ChfCheckupComponent.prototype.fetchPatientVitals = function (onFinished) {
        var _this = this;
        this.vitalsAvailable = false;
        this.log("auth0Headers: ", this.auth0Headers);
        this.sharedService.ajaxGetCall(this.URL_FETCH_VITALS + "?patientId=" + this.patientId, this.auth0Headers, function (response) {
            _this.log("vitals response: ", response.body);
            var vitals = JSON.parse(response.body);
            var weightArr = vitals.filter(function (item) { return item.type == _this.sharedService.VITAL_TYPE_WEIGHT + ""; });
            var spo2Arr = vitals.filter(function (item) { return item.type == _this.sharedService.VITAL_TYPE_SPO2 + ""; });
            var latestWeight = weightArr[0];
            var latestSpo2 = spo2Arr[0];
            _this.log("latestWeight: ", latestWeight);
            _this.log("latestSpo2: ", latestSpo2);
            _this.setCurrWeight(latestWeight.v1, latestWeight.timestampMs);
            _this.setCurrO2(latestSpo2.v2, latestSpo2.timestampMs);
            _this.vitalsAvailable = true;
            onFinished();
        });
    };
    ChfCheckupComponent.prototype.setTestVitals = function (onFinished) {
        var _this = this;
        this.log("Setting test vitals ... ");
        setTimeout(function () {
            //let currWeightTimestamp = 1517974368000;
            var currWeightTimestamp = new Date().getTime();
            //let currO2SatTimestamp = 1517974368000;
            var currO2SatTimestamp = new Date().getTime(); //1517974368000;
            _this.setCurrWeight(161, currWeightTimestamp);
            _this.setCurrO2(87, currO2SatTimestamp);
            _this.vitalsAvailable = true;
            onFinished();
        }, 5000);
    };
    ChfCheckupComponent.prototype.getPatientThresholdCriteriaOld = function () {
        this.patientVitalThresholdCriteria = [
            {
                vital: this.sharedService.VITAL_TYPE_WEIGHT,
                threshold_function: __WEBPACK_IMPORTED_MODULE_2__enum_threshold_function__["a" /* ThresholdFunction */].ABOVE,
                threshold_value: 160,
                unit: "lbs",
                duration_seconds: 86400
            },
            {
                vital: this.sharedService.VITAL_TYPE_SPO2,
                threshold_function: __WEBPACK_IMPORTED_MODULE_2__enum_threshold_function__["a" /* ThresholdFunction */].BELOW,
                threshold_value: 88,
                unit: "&"
            }
        ];
    };
    ChfCheckupComponent.prototype.initPatientThresholdCriteria = function () {
        this.patientVitalThresholdCriteria = [];
        this.patientVitalThresholdCriteria[this.sharedService.VITAL_TYPE_WEIGHT] = "this.currWeight > 160";
        this.patientVitalThresholdCriteria[this.sharedService.VITAL_TYPE_SPO2] = "this.currO2Sat < 88";
    };
    ChfCheckupComponent.prototype.initPatientVitalAgeCriteria = function () {
        this.patientVitalAgeCriteria = [];
        this.patientVitalAgeCriteria[this.sharedService.VITAL_TYPE_WEIGHT] = "((new Date().getTime() - this.currWeightTimestamp)/1000) > 86400";
        this.patientVitalAgeCriteria[this.sharedService.VITAL_TYPE_SPO2] = "((new Date().getTime() - this.currO2SatTimestamp)/1000) > 4800";
    };
    ChfCheckupComponent.prototype.isThresholdViolated = function (vital) {
        this.log("eval(" + this.patientVitalThresholdCriteria[vital] + ")");
        return eval(this.patientVitalThresholdCriteria[vital]);
    };
    ChfCheckupComponent.prototype.isVitalOld = function (vital) {
        this.log("eval(" + this.patientVitalAgeCriteria[vital] + ")");
        return eval(this.patientVitalAgeCriteria[vital]);
    };
    ChfCheckupComponent.prototype.initQuestionList = function () {
        this.questionList = [
            { id: "weight_vital", type: "vital", vital: this.sharedService.VITAL_TYPE_WEIGHT, short_text: "Weight (lbs)", long_text: "What's your blood oxygen saturation?" },
            { id: "spo2_vital", type: "vital", vital: this.sharedService.VITAL_TYPE_SPO2, short_text: "O2 Sat (%)", long_text: "What's your body weight in pounds?" },
            { id: "heavy_meal_q", type: "boolean", short_text: "Heavy Meal?", long_text: "You have gained weight. Did you just consume a heavy meal?" },
            { id: "swelling_q", type: "boolean", short_text: "Feet/Stomach Swollen?", long_text: "Is your feet or stomach (or both) swollen?" },
            { id: "short_breath_q", type: "boolean", short_text: "Shortness of Breath?", long_text: "Are you finding it difficult to breathe?" },
            { id: "workout_q", type: "boolean", short_text: "Heavy Workout/Labor Work?", long_text: "Did you just perform a heavy workout or labor work?" },
            { id: "chest_pain_q", type: "boolean", short_text: "Chest Pain?", long_text: "Are you experiencing chest pain?" },
            { id: "confused_q", type: "boolean", short_text: "Confused?", long_text: "Are you feeling confused or disoriented?" }
        ];
    };
    ChfCheckupComponent.prototype.cancelCheckup = function () {
        location.reload();
    };
    ChfCheckupComponent.prototype.startCheckup = function () {
        var _this = this;
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
        this.fetchPatientVitals(function () { _this.runCheckup(); });
        //this.runCheckup();
    };
    ChfCheckupComponent.prototype.runCheckup = function () {
        this.log("Running Check up");
        this.checkRed();
    };
    ChfCheckupComponent.prototype.setCurrO2 = function (o2Percent, timestamp) {
        this.currO2Sat = o2Percent;
        this.currO2SatTimestamp = timestamp;
        this.log("Setting O2Sat: " + o2Percent);
        var question = this.questionList.find(function (qitem) { return qitem.id == "spo2_vital"; });
        this.setAnswer(o2Percent, question.id);
    };
    ChfCheckupComponent.prototype.setCurrWeight = function (weightLbs, timestamp) {
        this.currWeight = weightLbs;
        this.currWeightTimestamp = timestamp;
        this.log("Setting Weight: " + weightLbs);
        var question = this.questionList.find(function (qitem) { return qitem.id == "weight_vital"; });
        this.setAnswer(weightLbs, question.id);
    };
    ChfCheckupComponent.prototype.checkWeightLogic = function () {
        if (this.checkWeightLogicCompleted) {
            this.checkSpo2Logic();
            return;
        }
        var question = this.questionList.find(function (qitem) { return qitem.id == "weight_vital"; });
        this.log("Question: ", question);
        this.log("Answer List: ", this.answerList);
        if (!(question.id in this.answerList)) {
            this.log("Weight Not Available", question);
            this.speak("Please check your weight and run Check Up again!");
            this.instructionList.push(new Instruction("text", "Please take your weight and run check up again"));
            this.checkWeightLogicCompleted = true;
            this.onCheckupFinished();
            return;
        }
        else {
            var currWeight = this.answerList[question.id].answer;
            this.log("Curr Weight: " + currWeight);
            var currWeightTimestamp = this.currWeightTimestamp;
            if (this.isVitalOld(this.sharedService.VITAL_TYPE_WEIGHT)) {
                this.log("Weight Value Old", question);
                this.speak("Your weight was taken a long time ago. Please check your weight and run Check Up again!");
                this.instructionList.push(new Instruction("text", "Old Weight. Please take your weight and run check up again"));
                this.checkWeightLogicCompleted = true;
                this.onCheckupFinished();
                return;
            }
            // weight threshold violated
            if (this.isThresholdViolated(this.sharedService.VITAL_TYPE_WEIGHT)) {
                // call first responder
                this.log("You have gained weight");
                // heavy meal
                var question_1 = this.questionList.find(function (qitem) { return qitem.id == "heavy_meal_q"; });
                this.log("Question: ", question_1);
                this.log("Answer List: ", this.answerList);
                if (!(question_1.id in this.answerList)) {
                    this.log("Not Answered", question_1);
                    this.askQuestion(question_1);
                }
                else {
                    // Answer is YES
                    if (this.answerList[question_1.id].answer) {
                        this.log("YES HAD A HEAVY MEAL");
                        this.heavyMealBool = true;
                    }
                    else {
                        this.log("did not have heavy meal");
                        this.heavyMealBool = false;
                    }
                    // swelling
                    var question1 = this.questionList.find(function (qitem) { return qitem.id == "swelling_q"; });
                    this.log("Question: ", question1);
                    this.log("Answer List: ", this.answerList);
                    if (!(question1.id in this.answerList)) {
                        this.log("Not Answered", question1);
                        this.askQuestion(question1);
                    }
                    else {
                        // Answer is YES
                        if (this.answerList[question1.id].answer) {
                            this.log("YES Swelling");
                            this.swellingBool = true;
                        }
                        else {
                            this.log("did not have swelling");
                            this.swellingBool = false;
                        }
                        if (this.swellingBool) {
                            if (this.heavyMealBool)
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
            else {
                this.log("Weight Threshold NOT violated");
                this.checkWeightLogicCompleted = true;
                this.checkSpo2Logic();
            }
        }
    };
    ChfCheckupComponent.prototype.checkSpo2Logic = function () {
        // swelling
        // both no: Okay
        // if swelling: 500mg lasix. then();
        // if heavy meal and no swelling: 200mg lasix then();
        if (this.spo2LogicComplete) {
            this.onCheckupFinished();
            return;
        }
        this.log("Checking spo2 logic");
        var question = this.questionList.find(function (qitem) { return qitem.id == "spo2_vital"; });
        this.log("Question: ", question);
        this.log("Answer List: ", this.answerList);
        if (!(question.id in this.answerList)) {
            this.log("Spo2 Not Available", question);
            this.speak("Please check your Blood Oxygen and run Check Up again!");
            this.instructionList.push(new Instruction("text", "Please take your Blood Oxygen and run check up again"));
            this.onCheckupFinished();
            return;
        }
        else {
            var currO2Sat = this.answerList[question.id].answer;
            this.log("Curr O2Sat: " + currO2Sat);
            if (this.isVitalOld(this.sharedService.VITAL_TYPE_SPO2)) {
                this.log("O2 Value Old", question);
                this.speak("Your blood oxygen was taken a long time ago. Please check take a new Blood Oxygen reading and run Check Up again!");
                this.instructionList.push(new Instruction("text", "Old Blood Oxygen. Please take a new blood oxygen level and run check up again"));
                this.checkWeightLogicCompleted = true;
                this.onCheckupFinished();
                return;
            }
            // spo2 threshold violated
            if (this.isThresholdViolated(this.sharedService.VITAL_TYPE_SPO2)) {
                // call first responder
                this.log("Low Oxygen");
                // heavy meal
                var question_2 = this.questionList.find(function (qitem) { return qitem.id == "short_breath_q"; });
                this.log("Question: ", question_2);
                this.log("Answer List: ", this.answerList);
                if (!(question_2.id in this.answerList)) {
                    this.log("Not Answered", question_2);
                    this.askQuestion(question_2);
                }
                else {
                    // Answer is YES
                    if (this.answerList[question_2.id].answer) {
                        this.log("YES Short of Breath");
                        this.shortnessOfBreath = true;
                    }
                    else {
                        this.log("No Shortness of breath");
                        this.shortnessOfBreath = false;
                        this.onCheckupFinished();
                        return;
                    }
                    // workout or labor
                    var question1 = this.questionList.find(function (qitem) { return qitem.id == "workout_q"; });
                    this.log("Question: ", question1);
                    this.log("Answer List: ", this.answerList);
                    if (!(question1.id in this.answerList)) {
                        this.log("Not Answered", question1);
                        this.askQuestion(question1);
                    }
                    else {
                        // Answer is YES
                        if (this.answerList[question1.id].answer) {
                            this.log("YES Did workout");
                            this.workoutOrLabor = true;
                        }
                        else {
                            this.log("did not have swelling");
                            this.workoutOrLabor = false;
                        }
                        // shortness of breath is assumed if here!
                        if (this.workoutOrLabor)
                            this.instructionList.push(new Instruction("text", "Take rest for 2 hours and run Check Up again."));
                        else
                            this.instructionList.push(new Instruction("video", "Use a nebulizer.", this.URL_NEBULIZER_YOUTUBE));
                        this.onCheckupFinished();
                    }
                }
            }
            else {
                this.log("O2 Threshold NOT violated");
                this.onCheckupFinished();
            }
        }
    };
    ChfCheckupComponent.prototype.checkRed = function () {
        if (this.redLogicCompleted) {
            this.checkWeightLogic();
            return;
        }
        var question = this.questionList.find(function (qitem) { return qitem.id == "chest_pain_q"; });
        this.log("Question: ", question);
        this.log("Answer List: ", this.answerList);
        if (!(question.id in this.answerList)) {
            this.log("Not Answered", question);
            this.askQuestion(question);
        }
        else {
            if (this.answerList[question.id].answer) {
                // call first responder
                this.log("Calling First Responder!");
                this.instructionList.push(new Instruction("text", "Calling First Responder Please Wait ... "));
                this.redLogicCompleted = true;
                this.onCheckupFinished();
                return;
            }
            else {
                this.log("No chest pain!");
                var question_3 = this.questionList.find(function (qitem) { return qitem.id == "confused_q"; });
                if (!(question_3.id in this.answerList)) {
                    this.log("Not Answered", question_3);
                    this.askQuestion(question_3);
                }
                else {
                    if (this.answerList[question_3.id].answer) {
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
    };
    ChfCheckupComponent.prototype.askQuestion = function (question) {
        this.speak(question.long_text);
        this.currQuestion = question;
        this.changeRef.detectChanges();
    };
    ChfCheckupComponent.prototype.speak = function (str) {
        this.log("Speaking '" + str + "'");
        console.log("Speaking TTS: '" + str + "'");
        JV_BTReadings.speak(str);
    };
    ChfCheckupComponent.prototype.setAnswer = function (answer, qId) {
        //this.questionList.find(item=>item.q.id==qId).a = boolAnswer;
        var question = this.questionList.find(function (qitem) { return qitem.id == qId; });
        this.log("Setting answer for: ", question);
        var ansObj = { question: question, answer: answer };
        this.answerList[qId] = ansObj;
        this.answerValues.push(ansObj);
        //this.log("Answer List: ", this.answerList);
        this.changeRef.detectChanges();
        this.runCheckup();
    };
    ChfCheckupComponent.prototype.onCheckupFinished = function () {
        this.checkupCompleted = true;
    };
    ChfCheckupComponent.prototype.displayInstructions = function () {
    };
    ChfCheckupComponent.prototype.openYoutubeDialog = function (url) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 10;
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 10;
        var dialogRef = this.dialog.open(YoutubeDialog, {
            disableClose: true,
            width: (w) + "px",
            height: (h) + "px",
            data: { youtube_url: this.URL_NEBULIZER_YOUTUBE, w: w, h: h }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    ChfCheckupComponent.prototype.syncCheckupWithServer = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])("width"),
        __metadata("design:type", Object)
    ], ChfCheckupComponent.prototype, "width", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])("height"),
        __metadata("design:type", Object)
    ], ChfCheckupComponent.prototype, "height", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])("auth0Headers"),
        __metadata("design:type", Object)
    ], ChfCheckupComponent.prototype, "auth0Headers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])("patientId"),
        __metadata("design:type", Object)
    ], ChfCheckupComponent.prototype, "patientId", void 0);
    ChfCheckupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'chf-checkup',
            template: __webpack_require__("../../../../../src/app/chf-checkup/chf-checkup.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_1__services_shared_service_service__["a" /* SharedService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], ChfCheckupComponent);
    return ChfCheckupComponent;
}());

var Instruction = (function () {
    function Instruction(type, text, obj) {
        this.type = type;
        this.text = text;
        this.obj = obj;
    }
    return Instruction;
}());

var YoutubeDialog = (function () {
    function YoutubeDialog(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.w = 0;
        this.h = 0;
        this.youtube_url = "";
        this.youtube_url = data.youtube_url;
        this.w = data.w;
        this.h = data.h;
        console.log("Window width: " + data.w + "x" + data.h);
        console.log("Opening " + this.youtube_url);
        setTimeout(function () {
            var iframeElement = _this.iframeEl.nativeElement;
            console.log(iframeElement);
            //iframeElement.src = this.youtube_url;
            //iframeElement.contentWindow.location.href = this.youtube_url;
            //readonly URL_NEBULIZER_YOUTUBE = "assets/video/nebulizer.mp4";
            iframeElement.src = "assets/chf/nebulizervideo.html";
        }, 2000);
    }
    YoutubeDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])("iframeEl"),
        __metadata("design:type", Object)
    ], YoutubeDialog.prototype, "iframeEl", void 0);
    YoutubeDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'youtube-dialog',
            template: "\n    <iframe #iframeEl [width]=\"w*0.75\" [height]=\"h*0.7\" [style.width]='w' [style.height]='h' [src]=\"\"  frameborder=\"0\"></iframe>\n    <button mat-button mat-dialog-close color=\"warn\"><i class=\"fas fa-window-close\"></i> <span>Close</span></button>\n  ",
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_material__["c" /* MatDialogRef */], Object])
    ], YoutubeDialog);
    return YoutubeDialog;
}());



/***/ }),

/***/ "../../../../../src/app/chf-checkup/enum-threshold-function.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThresholdFunction; });
var ThresholdFunction;
(function (ThresholdFunction) {
    ThresholdFunction[ThresholdFunction["ABOVE"] = 0] = "ABOVE";
    ThresholdFunction[ThresholdFunction["BELOW"] = 1] = "BELOW";
    ThresholdFunction[ThresholdFunction["EQUALS"] = 2] = "EQUALS";
    ThresholdFunction[ThresholdFunction["BETWEEN"] = 3] = "BETWEEN";
})(ThresholdFunction || (ThresholdFunction = {}));


/***/ }),

/***/ "../../../../../src/app/ecg-view/ecg-view.component.html":
/***/ (function(module, exports) {

module.exports = "<canvas #ecgCanvas [width]=\"width\" [height]=\"height\" [style.width]=\"width\" [style.height]=\"height\"></canvas>"

/***/ }),

/***/ "../../../../../src/app/ecg-view/ecg-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EcgViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var EcgViewComponent = (function () {
    function EcgViewComponent(zone) {
        var _this = this;
        this.zone = zone;
        this.width = 600;
        this.height = 400;
        this.ch1 = [];
        this.totalSamplesReceived = 0;
        this.SAMPLE_RATE = 250;
        this.ECG_WINDOW_MS = 5000;
        //readonly FPS = 2;
        this.ECG_WINDOW_REFRESH_MS = 50;
        this.SAMPLE_COUNT_TO_DISCARD = 25; //this.SAMPLE_RATE/(1000/this.ECG_WINDOW_MS); //this.ECG_WINDOW_REFRESH_MS * this.SAMPLE_RATE / 1000;
        this.ECG_WINDOW_SAMPLE_COUNT = this.ECG_WINDOW_MS * this.SAMPLE_RATE / 1000;
        this.MIN_SAMPLE_COUNT_FOR_PLOTTING = (this.ECG_WINDOW_SAMPLE_COUNT * 1.1); //((this.ECG_WINDOW_MS/1000) * 2 * this.SAMPLE_RATE);
        this.EMPTY_SIGNAL_VALUE = -999999999999;
        // get one second data from bluetooth/java layer
        this.firstOneSecondReceived = false;
        HomeJs.EcgViewUi = {
            //dummy: (args)=>{this.zone.run(()=>{this.dummy(args)})},
            onNewOneSecondData: function (ch1) { _this.zone.run(function () { _this.onNewOneSecondData(ch1); }); }
        };
    }
    EcgViewComponent.prototype.ngOnInit = function () {
    };
    EcgViewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //this.ch1 = [];
        this.ch1 = Array(this.MIN_SAMPLE_COUNT_FOR_PLOTTING).fill(this.EMPTY_SIGNAL_VALUE, 0, this.MIN_SAMPLE_COUNT_FOR_PLOTTING - 1);
        console.log(this.ch1.length + " samples initialized");
        console.log("ECG VIEW: " + this.width + "x" + this.height);
        this.ecgCanvasContext = this.ecgCanvas.nativeElement.getContext("2d");
        this.currAnomationFrameId = requestAnimationFrame(function () {
            _this.plotCurrEcgWindow();
        });
        this.totalSamplesReceived = 0;
        this.firstOneSecondReceived = true;
    };
    EcgViewComponent.prototype.pushArray = function (arr, newArr) {
        arr.push.apply(arr, newArr);
    };
    EcgViewComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.currAnomationFrameId);
    };
    EcgViewComponent.prototype.onNewOneSecondData = function (oneSecondData) {
        this.firstOneSecondReceived = true;
        console.log("Received new " + oneSecondData.length + "; total samples: " + this.totalSamplesReceived + "; " + this.samplesToMs(this.SAMPLE_RATE, this.totalSamplesReceived) + " ms");
        if (this.ch1 == undefined) {
            console.log("undefined ch1");
            this.ch1 = [];
            this.ch1.fill(this.EMPTY_SIGNAL_VALUE, 0, this.MIN_SAMPLE_COUNT_FOR_PLOTTING);
        }
        this.pushArray(this.ch1, oneSecondData);
        this.totalSamplesReceived += oneSecondData.length;
        //console.log("ch1 length: " + this.ch1.length); 
        //console.log(this.ch1);
        this.drawTimeElapsed();
    };
    EcgViewComponent.prototype.plotCurrEcgWindow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var currEcgWindowArr;
            return __generator(this, function (_a) {
                //console.log(">> ch1 length: " + this.ch1.length);
                if (this.ch1.length < this.MIN_SAMPLE_COUNT_FOR_PLOTTING) {
                    //console.log("Not enough samples to plot. Returning. " + this.ch1.length + " samples.");
                    setTimeout(function () {
                        _this.currAnomationFrameId = requestAnimationFrame(function () {
                            _this.plotCurrEcgWindow();
                        });
                    }, this.ECG_WINDOW_REFRESH_MS);
                    return [2 /*return*/];
                }
                currEcgWindowArr = this.ch1.slice(0, this.ECG_WINDOW_SAMPLE_COUNT);
                // draw currEcgWindowArr
                this.drawEcgOnCanvas(currEcgWindowArr);
                if (this.firstOneSecondReceived)
                    this.ch1.splice(0, this.SAMPLE_COUNT_TO_DISCARD);
                setTimeout(function () {
                    _this.currAnomationFrameId = requestAnimationFrame(function () {
                        _this.plotCurrEcgWindow();
                    });
                }, this.ECG_WINDOW_REFRESH_MS);
                return [2 /*return*/];
            });
        });
    };
    EcgViewComponent.prototype.drawEcgOnCanvas = function (ecgWindowArr) {
        var _this = this;
        var xSep = this.width / ecgWindowArr.length;
        //console.log("Plot: xSep = " + xSep);
        //console.log("Plotting " + ecgArr.length + " samples");
        //console.log(" ");
        //console.log(" ");
        //console.log(" ");
        //console.log(ecgArr);
        //var max = Math.max.apply(null, ecgWindowArr);
        var max = -99999999;
        ecgWindowArr.forEach(function (y) {
            if (y > max && y != _this.EMPTY_SIGNAL_VALUE)
                max = y;
        });
        var min = 99999999;
        ecgWindowArr.forEach(function (y) {
            if (y < min && y != _this.EMPTY_SIGNAL_VALUE)
                min = y;
        });
        // making all positive
        ecgWindowArr = ecgWindowArr.map(function (y) {
            if (y == _this.EMPTY_SIGNAL_VALUE)
                return y;
            else
                return y + Math.abs(min);
        });
        //console.log(ecgWindowArr);
        //console.log("Max: " + max + ", Min: " + min);
        // scaling to canvas
        var scale = this.height / (max - min);
        var scaledEcgWindowArr = ecgWindowArr.map(function (y) {
            if (y == _this.EMPTY_SIGNAL_VALUE)
                return _this.EMPTY_SIGNAL_VALUE;
            else
                return Math.floor(_this.height - (y * scale));
        }); // inverted scale
        //console.log(scaledEcgWindowArr);
        var prevX = 0;
        var prevY = scaledEcgWindowArr[0];
        var x = 0;
        this.ecgCanvasContext.clearRect(0, 0, this.width, this.height);
        //this.drawGrid(this.width, this.height, this.ECG_WINDOW_MS);
        scaledEcgWindowArr.forEach(function (y) {
            _this.ecgCanvasContext.beginPath();
            _this.ecgCanvasContext.lineWidth = 1;
            _this.ecgCanvasContext.moveTo(prevX, prevY);
            _this.ecgCanvasContext.lineTo(x, y);
            if (y == _this.EMPTY_SIGNAL_VALUE)
                _this.ecgCanvasContext.strokeStyle = '#fff';
            else
                _this.ecgCanvasContext.strokeStyle = '#f00';
            _this.ecgCanvasContext.stroke();
            prevX = x;
            prevY = y;
            x += xSep;
        });
        this.drawTimeElapsed();
    };
    EcgViewComponent.prototype.drawTimeElapsed = function () {
        var totalElapsedMs = this.samplesToMs(this.SAMPLE_RATE, this.totalSamplesReceived);
        var timeElapsedStr = this.msToMmSs(totalElapsedMs);
        this.ecgCanvasContext.fillStyle = "rgba(245, 245, 245, 0.75)";
        this.ecgCanvasContext.fillRect(0, 0, 100, 20);
        this.ecgCanvasContext.fillStyle = "#235";
        this.ecgCanvasContext.font = "10pt Arial";
        this.ecgCanvasContext.fillText(timeElapsedStr + " elapsed", 8, 15);
    };
    EcgViewComponent.prototype.samplesToMs = function (sampleRate, samples) {
        return Math.ceil((samples * 1000) / sampleRate);
    };
    EcgViewComponent.prototype.msToMmSs = function (duration) {
        var milliseconds = Math.floor((duration % 1000) / 100);
        var seconds = Math.floor((duration / 1000) % 60);
        var minutes = Math.floor((duration / (1000 * 60)) % 60);
        var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        var hoursStr = (hours < 10) ? "0" + hours : hours;
        var minutesStr = (minutes < 10) ? "0" + minutes : minutes;
        var secondsStr = (seconds < 10) ? "0" + seconds : seconds;
        return minutesStr + ":" + secondsStr;
    };
    // grid
    EcgViewComponent.prototype.drawGrid = function (canvasWidth, canvasHeight, stripWidthMs) {
        var largeSquareWidth = (canvasWidth * 200) / stripWidthMs;
        var smallSquareWidth = (canvasWidth * 40) / stripWidthMs;
        this.ecgCanvasContext.lineWidth = 1;
        // large squares
        // vertical lines
        var i = 0;
        var currX = 0;
        while (currX < canvasWidth) {
            //console.log("Plot: Vertical Line at x = " + currX);
            this.ecgCanvasContext.beginPath();
            this.ecgCanvasContext.moveTo(currX, 0);
            this.ecgCanvasContext.lineTo(currX, canvasHeight);
            if (i % 5 == 0) {
                this.ecgCanvasContext.strokeStyle = 'rgba(255,0,0,0.5)';
            }
            else {
                //this.ecgCanvasContext.strokeStyle = 'rgba(255,0,0,0.1)';
            }
            this.ecgCanvasContext.stroke();
            currX += smallSquareWidth;
            i++;
        }
        var j = 0;
        var currY = 0;
        while (currY < canvasHeight) {
            //console.log("Plot: Horizontal Line at y = " + currY);
            this.ecgCanvasContext.beginPath();
            this.ecgCanvasContext.moveTo(0, currY);
            this.ecgCanvasContext.lineTo(canvasWidth, currY);
            if (j % 5 == 0) {
                this.ecgCanvasContext.strokeStyle = 'rgba(255,0,0,0.5)';
            }
            else {
                //this.ecgCanvasContext.strokeStyle = 'rgba(255,0,0,0.1)';
            }
            this.ecgCanvasContext.stroke();
            currY += smallSquareWidth;
            j++;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('ecgCanvas'),
        __metadata("design:type", Object)
    ], EcgViewComponent.prototype, "ecgCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])("width"),
        __metadata("design:type", Object)
    ], EcgViewComponent.prototype, "width", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])("height"),
        __metadata("design:type", Object)
    ], EcgViewComponent.prototype, "height", void 0);
    EcgViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'ecg-view',
            template: __webpack_require__("../../../../../src/app/ecg-view/ecg-view.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgZone */]])
    ], EcgViewComponent);
    return EcgViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/evisit-view/evisit-view.component.html":
/***/ (function(module, exports) {

module.exports = "<style>\n\n    #evisitMyVideo {\n        position: relative;\n        top: 5px;\n        left: 5px;\n        z-index: 2;\n        box-shadow: 0px 0px 10px 3px rgba(180, 180, 180, 0.7);\n\n        border: 0px black solid;\n        border-radius: 10px;\n    }\n\n    #evisitPeerVideo {\n        position: relative;\n        top: 5px;\n        left: 20px;\n        z-index: 1;\n        \n        border: 0px red solid;\n        border-radius: 10px;\n    }\n\n    #switchCameraBtn {\n      position: relative;\n      top: -100px;\n    }\n\n</style>\n\n<div #mainView style=\"width:100%;height:100%;\">\n\n    <div #myVideo id=\"evisitMyVideo\"></div>\n    <div #peerVideo id=\"evisitPeerVideo\"></div>\n\n    <!--<button id=\"switchCameraBtn\" mat-raised-button (click)=\"switchCamera()\">Switch Camera</button>-->\n\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/evisit-view/evisit-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EVisitViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_service_service__ = __webpack_require__("../../../../../src/app/services/shared-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EVisitViewComponent = (function () {
    function EVisitViewComponent(snackBar, sharedService) {
        this.snackBar = snackBar;
        this.sharedService = sharedService;
        this.width = 200;
        this.height = 200;
        this.opentokSessionId = "";
        this.opentokToken = "";
        this.opentokApiKey = "";
        this.mainWidth = -1;
        this.mainHeight = -1;
    }
    EVisitViewComponent.prototype.ngOnInit = function () {
        console.log(this.width + " x " + this.height);
    };
    EVisitViewComponent.prototype.ngAfterViewInit = function () {
        this.initVideoContainers();
        this.getSelectedCamera();
    };
    EVisitViewComponent.prototype.initVideoContainers = function () {
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
        this.peerVideo.nativeElement.style.top = (-this.myVideoHeight + 10) + "px";
        this.peerVideo.nativeElement.style.left = (this.myVideoWidth - 2) + "px";
        $("<style type='text/css'> #evisitMyVideo video{width:" + this.myVideoWidth + "px; height:" + this.myVideoHeight + "px;}</style>").appendTo("head");
        $("<style type='text/css'> #evisitPeerVideo video{width:" + this.peerVideoWidth + "px; height:" + this.peerVideoHeight + "px;}</style>").appendTo("head");
    };
    EVisitViewComponent.prototype.getSelectedCamera = function () {
        var _this = this;
        OT.getDevices(function (error, devices) {
            _this.audioInputDevices = devices.filter(function (element) {
                return element.kind == "audioInput";
            });
            _this.videoInputDevices = devices.filter(function (element) {
                return element.kind == "videoInput";
            });
            console.log("Video Devices: ", _this.videoInputDevices);
            _this.currCameraIndex = parseInt(localStorage.getItem("cameraSelected"));
            if (Number.isNaN(_this.currCameraIndex)) {
                _this.currCameraIndex = 0;
                console.log("NaN hai. Khaega!");
            }
            console.log("Curr Camera: " + _this.currCameraIndex);
            _this.initializeSession();
        });
    };
    EVisitViewComponent.prototype.handleOTError = function (error) {
        if (error) {
            //alert(error.message);
            this.snackBar.open(error.message, "", { duration: 5000 });
            console.error(error);
        }
    };
    EVisitViewComponent.prototype.initializeSession = function () {
        var _this = this;
        this.session = OT.initSession(this.opentokApiKey, this.opentokSessionId);
        // Subscribe to a newly created stream
        this.session.on('streamCreated', function (event) {
            _this.session.subscribe(event.stream, 'evisitPeerVideo', {
                insertMode: 'replace',
                width: _this.peerVideoWidth,
                height: _this.peerVideoHeight,
            }, _this.handleOTError);
        });
        // Create a publisher 
        console.log("CurrCamera: " + this.currCameraIndex);
        var publisher = OT.initPublisher('evisitMyVideo', {
            insertMode: 'replace',
            width: this.myVideoWidth,
            height: this.myVideoHeight,
            resolution: '1280x720',
            videoSource: this.videoInputDevices[this.currCameraIndex].deviceId
        }, this.handleOTError);
        // Connect to the session
        this.session.connect(this.opentokToken, function (error) {
            // If the connection is successful, initialize a publisher and publish to the session
            if (error) {
                _this.handleOTError(error);
            }
            else {
                _this.session.publish(publisher, _this.handleOTError);
            }
        });
    };
    EVisitViewComponent.prototype.switchCamera = function () {
        console.log(this.videoInputDevices);
        var newCamera = (this.videoInputDevices.length > (this.currCameraIndex + 1)) ? (this.currCameraIndex + 1) : 0;
        if (newCamera == this.currCameraIndex) {
            return;
        }
        this.currCameraIndex = newCamera;
        localStorage.setItem("cameraSelected", this.currCameraIndex);
        console.log("new camera: " + newCamera);
        var publisher = OT.initPublisher('myVideo', {
            insertMode: 'replace',
            resolution: '1280x720',
            width: this.myVideoWidth,
            height: this.myVideoHeight,
            videoSource: this.videoInputDevices[this.currCameraIndex].deviceId
        }, this.handleOTError);
        this.session.publish(publisher, this.handleOTError);
    };
    EVisitViewComponent.prototype.endCall = function () {
        console.log("ending call ... ");
        //location.href="about:blank";
    };
    EVisitViewComponent.prototype.ngOnDestroy = function () {
        console.log("EVisit End: onDestroy()");
        //TODO
        this.session.disconnect();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('mainView'),
        __metadata("design:type", Object)
    ], EVisitViewComponent.prototype, "mainView", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('myVideo'),
        __metadata("design:type", Object)
    ], EVisitViewComponent.prototype, "myVideo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('peerVideo'),
        __metadata("design:type", Object)
    ], EVisitViewComponent.prototype, "peerVideo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], EVisitViewComponent.prototype, "width", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], EVisitViewComponent.prototype, "height", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], EVisitViewComponent.prototype, "opentokSessionId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], EVisitViewComponent.prototype, "opentokToken", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], EVisitViewComponent.prototype, "opentokApiKey", void 0);
    EVisitViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'evisit-view',
            template: __webpack_require__("../../../../../src/app/evisit-view/evisit-view.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatSnackBar */], __WEBPACK_IMPORTED_MODULE_2__services_shared_service_service__["a" /* SharedService */]])
    ], EVisitViewComponent);
    return EVisitViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pipes/safe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Pipe */])({ name: 'safe' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SafePipe);
    return SafePipe;
}());



/***/ }),

/***/ "../../../../../src/app/services/devicelist.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevicelistService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DevicelistService = (function () {
    function DevicelistService() {
        this.VITAL_TYPE_NONE = -5000;
        this.VITAL_TYPE_SPO2 = 1;
        this.VITAL_TYPE_WEIGHT = 2;
        this.VITAL_TYPE_BP = 4;
        this.VITAL_TYPE_ECG = 5;
        this.VITAL_TYPE_PKFLOW = 6;
        this.VITAL_TYPE_SUGAR = 7;
        this.VITAL_TYPE_TEMP = 8;
        // DEVICE INFO JSONs
        // NONIN  
        this.noninDeviceInfo = {
            di_device_comm: {
                comm_type: "BT_SPP",
                di_comm_info: {
                    bt_name: "Nonin_Medical_Inc",
                    di_pairing_info: {
                        pairing_needed: true,
                        pin: "suffixOf:Nonin_Medical_Inc._",
                        di_pairing_instruction: {
                            //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=12",
                            img_src: "assets/img/devices/12/devicePicture.jpg",
                            text: "Place your finger in the oximeter to make it discoverable."
                        }
                    }
                }
            },
            device_id: "12",
            //device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=12",
            device_img_src: "assets/img/devices/12/devicePicture.jpg",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "Nonin"
            },
            device_model_number: "Nonin Onyx II 9560",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Place your finger inside the oximeter.",
                        voice: "please place your finger inside the oxymeter device.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=12&inst_num=1"
                        img_src: "assets/img/devices/12/inst_1.png"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected. Please stay still.",
                        voice: "Connected. Please stay still.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=12&inst_num=2"
                        img_src: "assets/img/devices/12/inst_2.png"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "Thank You. You may now remove your finger.",
                        voice: "Thank You. You may now remove your finger from the oxymeter device.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=12&inst_num=3"
                        img_src: "assets/img/devices/12/inst_3.png"
                    }
                }
            ]
        }; // end-dev-nonin-spo2
        /// pyle weighing scale
        this.pyleWeighingScaleDeviceInfo = {
            di_device_comm: {
                comm_type: "BT_LE",
                di_comm_info: {
                    bt_name: "Samico Scales",
                    di_pairing_info: {
                        pairing_needed: false,
                        pin: "-",
                        di_pairing_instruction: {
                            img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=30",
                            text: "Please tap the scale to turn LED screen on and make it discoverable"
                        }
                    }
                }
            },
            device_id: "30",
            device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=30",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "Pyle Audio"
            },
            device_model_number: "Pyle PHLSCBT4WT",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Place scale on hard surface. Step on scale. Stay still.",
                        voice: "Place the scale on a hard surface. Then step on the scale. and stay still.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=30&inst_num=1"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected. Please stay still.",
                        voice: "Connected. Please stay still.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=30&inst_num=2"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "Thank You. Step down from scale.",
                        voice: "You may now step down from the scale.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=30&inst_num=3"
                    }
                }
            ]
        }; // end pyle wt
        this.pyleBloodPressureDeviceInfo = {
            di_device_comm: {
                comm_type: "BT_LE",
                di_comm_info: {
                    bt_name: "Samico BP",
                    di_pairing_info: {
                        pairing_needed: false,
                        pin: "none",
                        di_pairing_instruction: {
                            img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=28",
                            text: "Place arm in cuff. Press the power button. Wait till device found."
                        }
                    }
                }
            },
            device_id: "30",
            device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=28",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "Pyle Audio"
            },
            device_model_number: "Pyle PHBPB20",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Place arm in cuff. Press the power button. Then stay still.",
                        voice: "Please place your arm in the cuff. Then press the power button. Then stay still.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=28&inst_num=1"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected. Please stay still.",
                        voice: "Connected. Please stay still.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=28&inst_num=2"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "Finished. Remove arm from cuff.",
                        voice: "Thank you. You may now remove your arm from the cuff.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=28&inst_num=3"
                    }
                }
            ]
        }; // end pyle bp 
        this.foraSugarTestNGoDeviceInfo = {
            di_device_comm: {
                comm_type: "BT_SPP",
                di_comm_info: {
                    bt_name: "TEST-N-GO",
                    di_pairing_info: {
                        pairing_needed: true,
                        pin: "none",
                        di_pairing_instruction: {
                            //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=31",
                            img_src: "assets/img/devices/31/devicePicture.jpg",
                            text: "With device turned off, press rear button 12 times in hole till 'PAr'. Then press front button to 'yes'. Then press rear button to start pairing mode."
                        }
                    }
                }
            },
            device_id: "30",
            //device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=31",
            device_img_src: "assets/img/devices/31/devicePicture.jpg",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "Fare Care"
            },
            device_model_number: "Test N'Go",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Place empty strip in device. Wait for drop symbol. Fill strip with blood. Remove Strip when reading is completed.",
                        voice: "Place empty strip in device. Wait for drop symbol. Fill strip with blood. Remove Strip when reading is completed.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=31&inst_num=1"
                        img_src: "assets/img/devices/31/inst_1.png"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected.",
                        voice: "Connected.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=31&inst_num=2"
                        img_src: "assets/img/devices/31/inst_2.png"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "Thank You. Please clean the device.",
                        voice: "Thank You. Please clean the device.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=31&inst_num=3"
                        img_src: "assets/img/devices/31/inst_3.png"
                    }
                }
            ]
        };
        // FORA BP-SUGAR D30F
        this.foraD30fBpSugarDeviceInfo = {
            di_device_comm: {
                comm_type: "BT_SPP",
                di_comm_info: {
                    bt_name: "TaiDoc-Device",
                    di_pairing_info: {
                        pairing_needed: false,
                        pin: "111111",
                        di_pairing_instruction: {
                            img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=22",
                            text: "Press the Back Button to turn on pairing."
                        }
                    }
                }
            },
            device_id: "22",
            device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=22",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "Fora Care"
            },
            device_model_number: "Fora D30f",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Place arm in cuff. Press the power button. Then stay still.",
                        voice: "Please place your arm in the cuff. Then press the power button. Then stay still.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=22&inst_num=1"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected. Please stay still.",
                        voice: "Connected. Please stay still.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=22&inst_num=2"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "Finished. Remove arm from cuff.",
                        voice: "Thank you. You may now remove your arm from the cuff.",
                        img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=22&inst_num=3"
                    }
                }
            ]
        }; // end fora bp d30f
        // Blood Pressure AND UE 651 BLE
        this.andBpUa651DeviceInfo = {
            di_device_comm: {
                comm_type: "BT_LE",
                di_comm_info: {
                    bt_name: "A&D_UA-651BLE",
                    di_pairing_info: {
                        pairing_needed: true,
                        pin: "-",
                        di_pairing_instruction: {
                            //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=34",
                            img_src: "assets/img/devices/34/devicePicture.jpg",
                            text: "Press and hold the power button till 'Pr' appears on the meter."
                        }
                    }
                }
            },
            device_id: "34",
            device_img_src: "assets/img/devices/34/devicePicture.jpg",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "A&D"
            },
            device_model_number: "A&D UA-651BLE",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Place arm in cuff. Press the power button. Then stay still.",
                        voice: "Please place your arm in the cuff. Then press the power button. Then stay still.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=34&inst_num=1"
                        img_src: "assets/img/devices/34/inst_1.png"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected.",
                        voice: "Connected.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=34&inst_num=2"
                        img_src: "assets/img/devices/34/inst_2.png"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "Finished. Remove arm from cuff.",
                        voice: "Thank you. You may now remove your arm from the cuff.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=34&inst_num=3"
                        img_src: "assets/img/devices/34/inst_3.png"
                    }
                }
            ]
        }; // end AND BP UA-651BLE
        // FAROS 360 ECG 
        this.faros360EcgDeviceInfo = {
            di_device_comm: {
                comm_type: "BT_SPP",
                di_comm_info: {
                    bt_name: "FAROS",
                    di_pairing_info: {
                        pairing_needed: false,
                        pin: "-",
                        di_pairing_instruction: {
                            //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=33",
                            img_src: "assets/img/devices/33/devicePicture.jpg",
                            text: "Press the Main Button to turn on pairing."
                        }
                    }
                }
            },
            device_id: "33",
            //device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=33",
            device_img_src: "assets/img/devices/33/devicePicture.jpg",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "Faros"
            },
            device_model_number: "Faros 360",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Please place the leads as shown in the figure",
                        voice: "Please place the leads as shown in the figure",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=33&inst_num=1"
                        img_src: "assets/img/devices/33/inst_1.png"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected. Please stay still.",
                        voice: "Connected. Please stay still.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=33&inst_num=2"
                        img_src: "assets/img/devices/33/inst_2.png"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "You may remove the leads. Place device for charging.",
                        voice: "Thank you. You may remove the leads. Place device for charging.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=33&inst_num=3"
                        img_src: "assets/img/devices/33/inst_3.png"
                    }
                }
            ]
        }; // end FAROS 360
        // Weght A&D UC-352BLE
        this.andWeightUa651DeviceInfo = {
            di_device_comm: {
                comm_type: "BT_LE",
                di_comm_info: {
                    bt_name: "A&D_UC-352BLE",
                    di_pairing_info: {
                        pairing_needed: true,
                        pin: "-",
                        di_pairing_instruction: {
                            //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=34",
                            img_src: "assets/img/devices/40/pairingInstruction.jpg",
                            text: "Press and hold the SET button behind the scale till 'Pr' appears on the meter."
                        }
                    }
                }
            },
            device_id: "40",
            device_img_src: "assets/img/devices/40/devicePicture.jpg",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "A&D"
            },
            device_model_number: "A&D UC-352BLE",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Step on scale till you hear three beeps to step off.",
                        voice: "Step on the scale and stay still. When you hear three beeps, step off.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=1"
                        img_src: "assets/img/devices/40/inst_1.gif"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected.",
                        voice: "Connected.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=2"
                        img_src: "assets/img/devices/40/inst_2.jpg"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "Finished.",
                        voice: "Thank you.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=3"
                        img_src: "assets/img/devices/40/inst_3.jpg"
                    }
                }
            ]
        }; // end AND BP UA-651BLE
        // Innovo oximeter
        this.innovoSpo2BluetoothDeviceInfo = {
            di_device_comm: {
                comm_type: "BT_LE",
                di_comm_info: {
                    bt_name: "My Oximeter",
                    di_pairing_info: {
                        pairing_needed: false,
                        pin: "-",
                        di_pairing_instruction: {
                            //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=34",
                            img_src: "assets/img/devices/50/pairingInstruction.jpg",
                            text: "Press the power button and place finger inside oximeter to make device discoverable."
                        }
                    }
                }
            },
            device_id: "50",
            device_img_src: "assets/img/devices/50/devicePicture.jpg",
            di_device_manufacturer: {
                manufacturer_id: "3",
                manufacturer_name: "Innovo"
            },
            device_model_number: "Bluetooth Oximeter",
            di_usage_instruction_set: [
                {
                    di_usage_instruction: {
                        at: "WAITING_FOR_CONNECTION",
                        ref_num: 101,
                        text: "Press Power Button. Place Finger inside oximeter and stay still.",
                        voice: "Press the power button and place your finger inside oximeter and stay still.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=1"
                        img_src: "assets/img/devices/50/inst_1.jpg"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "CONNECTED",
                        ref_num: 102,
                        text: "Connected.",
                        voice: "Connected.",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=2"
                        img_src: "assets/img/devices/50/inst_2.jpg"
                    }
                },
                {
                    di_usage_instruction: {
                        at: "FINISHED",
                        ref_num: 102,
                        text: "Remove finger from the oximeter device",
                        voice: "Thank you. You may now remove your finger from the oximeter device",
                        //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=3"
                        img_src: "assets/img/devices/50/inst_3.jpg"
                    }
                }
            ]
        }; // end Innovo oximeter
    }
    DevicelistService.prototype.getPairingPinFor = function (devBtName) {
        if (devBtName.includes("Nonin_Medical_Inc")) {
            return devBtName.split("Nonin_Medical_Inc._")[1];
        }
        return "-";
    };
    DevicelistService.prototype.getBase64 = function (img_src) {
        return "";
    };
    DevicelistService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DevicelistService);
    return DevicelistService;
}());



/***/ }),

/***/ "../../../../../src/app/services/java-call.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JavaCallService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var JavaCallService = (function () {
    function JavaCallService() {
    }
    JavaCallService.prototype.setMainAppReferenceStr = function (refStr) {
        if (typeof JV_JSReferences != "undefined") {
            JV_JSReferences.setMainAppReferenceString(refStr);
        }
    };
    JavaCallService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], JavaCallService);
    return JavaCallService;
}());



/***/ }),

/***/ "../../../../../src/app/services/shared-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var SharedService = (function () {
    function SharedService() {
        //public readonly SERVER_BASE_URL = "http://192.168.57.1:3099";   // from genymotion
        //public readonly SERVER_BASE_URL = "http://192.168.43.130:3099"; // mobile hotspot
        //public readonly SERVER_BASE_URL = "http://192.168.1.50:3099";  // from device @ home wifi
        //public readonly SERVER_BASE_URL = "http://10.42.0.1:3099";  // from device @ goaway ubuntu hotspot
        //public readonly SERVER_BASE_URL = "http://192.168.0.31:3099";  // from device @ gavin's house
        //public readonly SERVER_BASE_URL = "http://192.168.0.101:3099";  // from qblabs-eth cubicle
        //public readonly SERVER_BASE_URL = "http://192.168.0.102:3099";  // from qblabs-wifi cubicle
        //public readonly SERVER_BASE_URL = "http://172.31.98.75:3099"; // starbucks
        //public readonly SERVER_BASE_URL = "https://www.mcare.clinic";  // from mcare.clinic
        this.SERVER_BASE_URL = "";
        this.TOKBOX_BASE_URL = "";
        this.VITAL_TYPE_NONE = -5000;
        this.VITAL_TYPE_SPO2 = 1;
        this.VITAL_TYPE_WEIGHT = 2;
        this.VITAL_TYPE_BP = 4;
        this.VITAL_TYPE_ECG = 5;
        this.VITAL_TYPE_PKFLOW = 6;
        this.VITAL_TYPE_SUGAR = 7;
        this.VITAL_TYPE_TEMP = 8;
        this.vitalString = [];
        this.initVitalStrings();
        this.initServerBaseUrl();
    }
    SharedService.prototype.initServerBaseUrl = function () {
        this.SERVER_BASE_URL = JV_BTReadings.getServerBaseUrl();
        console.log("SERVER_BASE_URL: " + this.SERVER_BASE_URL);
        this.TOKBOX_BASE_URL = this.SERVER_BASE_URL + "/vclinic/videochat";
    };
    SharedService.prototype.getOpenTokUrl = function (otApiKey, otSessionId, otToken, w, h) {
        var url = this.TOKBOX_BASE_URL
            + "?"
            + "apiKey=" + otApiKey
            + "&openTokSessionId=" + otSessionId
            + "&openTokToken=" + otToken
            + "&h=" + Math.floor(w)
            + "&w=" + Math.floor(h);
        return url;
    };
    /**
     * Generate a random string with a prefix and a postfix of size n
     * @param prefix
     * @param n
     */
    SharedService.prototype.generateRandomString = function (prefix, n) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < n; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return prefix + text;
    };
    /**
     * Logout the current account
     */
    SharedService.prototype.logout = function () {
        console.log("Logging out ... ");
        location.href = "/logout";
    };
    /**
     * Make an AJAX GET request
     * @param url
     * @param headers
     * @param doneCallback
     * @param failedCallback
     * @param alwaysCallback
     */
    SharedService.prototype.ajaxGetCall = function (url, headers, doneCallback, failedCallback, alwaysCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var ajax;
            return __generator(this, function (_a) {
                if (url == "" || typeof url == "undefined") {
                    console.log("Enter a URL");
                    return [2 /*return*/];
                }
                console.log("");
                console.log("AJAX GET: " + url);
                ajax = $.ajax({
                    method: "GET",
                    url: url,
                    headers: headers
                })
                    .done(function (response) {
                    console.log("AJAX RESPONSE: ", response);
                    console.log("");
                    if (response.exception && response.body.includes("ACCESS DENIED")) {
                        console.log("ACCESS DENIED");
                        this.logout();
                        return;
                    }
                    if (typeof doneCallback == "function")
                        doneCallback(response);
                })
                    .fail(function (response) {
                    console.log(response);
                    if (typeof failedCallback == "function")
                        failedCallback(response);
                })
                    .always(function (response) {
                    console.log(response);
                    if (typeof alwaysCallback == "function")
                        alwaysCallback(response);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Make an AJAX POST Request call
     * @param url
     * @param data
     * @param headers
     * @param doneCallback
     * @param failedCallback
     * @param alwaysCallback
     */
    SharedService.prototype.ajaxPostCall = function (url, data, headers, doneCallback, failedCallback, alwaysCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ajax;
            return __generator(this, function (_a) {
                if (url == "") {
                    console.log("Enter a URL");
                    return [2 /*return*/];
                }
                console.log("");
                console.log("AJAX POST: " + url);
                ajax = $.ajax({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: headers
                })
                    .done(function (response) {
                    console.log("AJAX RESPONSE: ", response);
                    console.log("");
                    if (response.exception && response.body.includes("ACCESS DENIED")) {
                        console.log("ACCESS DENIED");
                        _this.logout();
                        return;
                    }
                    if (typeof doneCallback == "function")
                        doneCallback(response);
                }).fail(function (response) {
                    console.log(response);
                    if (typeof failedCallback == "function")
                        failedCallback(response);
                }).always(function (response) {
                    console.log(response);
                    if (typeof alwaysCallback == "function")
                        alwaysCallback(response);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * print all static properties of Object
     * @param object
     */
    SharedService.prototype.showStaticObjectVars = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("VClinicState ... ");
                Object.keys(object).forEach(function (item, key) { console.log("\t" + item + ": " + (object[item])); });
                return [2 /*return*/];
            });
        });
    };
    SharedService.prototype.getCurrentTimestamp = function () {
        return JV_BTReadings.getCurrentTimestamp();
    };
    SharedService.prototype.initVitalStrings = function () {
        this.vitalString[this.VITAL_TYPE_BP] = "Blood Pressure";
        this.vitalString[this.VITAL_TYPE_SPO2] = "Blood Sugar";
        this.vitalString[this.VITAL_TYPE_SUGAR] = "Blood Sugar";
        this.vitalString[this.VITAL_TYPE_WEIGHT] = "Body Weight";
        this.vitalString[this.VITAL_TYPE_NONE] = "None";
    };
    SharedService.prototype.getVitalStr = function (vital) {
        return this.vitalString[vital];
    };
    SharedService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SharedService);
    return SharedService;
}());



/***/ }),

/***/ "../../../../../src/app/vital-reading-view/vital-reading-view.component.html":
/***/ (function(module, exports) {

module.exports = "<style>\n\n</style>\n\n\n<div #mainView style=\"width:100%;height:100%;\">\n\n  \n\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/vital-reading-view/vital-reading-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VitalReadingViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VitalReadingViewComponent = (function () {
    function VitalReadingViewComponent(changeRef) {
        this.changeRef = changeRef;
        this.onVitalReadingStateChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.setTvMessage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.width = 200;
        this.height = 200;
        this.VITAL_TYPE_NONE = -5000;
        this.VITAL_TYPE_SPO2 = 1;
        this.VITAL_TYPE_WEIGHT = 2;
        this.VITAL_TYPE_BP = 4;
        this.VITAL_TYPE_ECG = 5;
        this.VITAL_TYPE_PKFLOW = 6;
        this.VITAL_TYPE_SUGAR = 7;
        this.VITAL_TYPE_TEMP = 8;
        this.currVitalType = this.VITAL_TYPE_NONE;
        this.VITAL_STATE_INIT = 100;
        this.VITAL_STATE_WAITING_FOR_CONNECTION = 101;
        this.VITAL_STATE_CONNECTED = 102;
        this.VITAL_STATE_READING_FINISHED = 103;
        this.VITAL_STATE_ERROR_DISCONNECTED = 111;
        this.BT_INST_4 = 104;
        this.BT_TIMEOUT = 110;
        this.VITAL_STATE_FINISHED = this.VITAL_STATE_INIT;
        this.BT_404 = 404; // vitalDeviceInfo not found
        this.currVitalReadingState = this.VITAL_STATE_INIT;
        this.prevVitalReadingState = this.VITAL_STATE_INIT;
        this.VITAL_VIEW_CHECKING_REGISTRATION = "VITAL_VIEW_CHECKING_REGISTRATION";
        this.currVitalView = this.VITAL_VIEW_CHECKING_REGISTRATION;
        this.registered = false;
    }
    VitalReadingViewComponent.prototype.ngOnInit = function () {
        this.checkDeviceRegistration();
    };
    VitalReadingViewComponent.prototype.setCurrVitalReadingState = function (currVitalReadingState) {
        this.prevVitalReadingState = this.currVitalReadingState;
        this.currVitalReadingState = currVitalReadingState;
        console.log("Updated Vital Reading State from " + this.prevVitalReadingState + " to " + this.currVitalReadingState);
        var stateInfo = { vital: this.currVitalType, old: this.prevVitalReadingState, new: this.currVitalReadingState };
        this.onVitalReadingStateChanged.emit(stateInfo);
    };
    VitalReadingViewComponent.prototype.checkDeviceRegistration = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Output */])(),
        __metadata("design:type", Object)
    ], VitalReadingViewComponent.prototype, "onVitalReadingStateChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Output */])(),
        __metadata("design:type", Object)
    ], VitalReadingViewComponent.prototype, "setTvMessage", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], VitalReadingViewComponent.prototype, "width", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], VitalReadingViewComponent.prototype, "height", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], VitalReadingViewComponent.prototype, "currVitalType", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", Object)
    ], VitalReadingViewComponent.prototype, "vitalDeviceInfo", void 0);
    VitalReadingViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'vital-reading-view',
            template: __webpack_require__("../../../../../src/app/vital-reading-view/vital-reading-view.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], VitalReadingViewComponent);
    return VitalReadingViewComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.prod.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map