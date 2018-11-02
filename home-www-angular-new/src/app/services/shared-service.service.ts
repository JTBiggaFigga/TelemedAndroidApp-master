import { Injectable } from '@angular/core';

declare var $: any;
declare var JV_BTReadings:any;

@Injectable()
export class SharedService {

  //public readonly SERVER_BASE_URL = "http://192.168.57.1:3099";   // from genymotion
  //public readonly SERVER_BASE_URL = "http://192.168.43.130:3099"; // mobile hotspot
  //public readonly SERVER_BASE_URL = "http://192.168.1.50:3099";  // from device @ home wifi
  //public readonly SERVER_BASE_URL = "http://10.42.0.1:3099";  // from device @ goaway ubuntu hotspot
  //public readonly SERVER_BASE_URL = "http://192.168.0.31:3099";  // from device @ gavin's house
  //public readonly SERVER_BASE_URL = "http://192.168.0.101:3099";  // from qblabs-eth cubicle
  //public readonly SERVER_BASE_URL = "http://192.168.0.102:3099";  // from qblabs-wifi cubicle
  //public readonly SERVER_BASE_URL = "http://172.31.98.75:3099"; // starbucks
  //public readonly SERVER_BASE_URL = "https://www.mcare.clinic";  // from mcare.clinic

  public SERVER_BASE_URL = "";
  public TOKBOX_BASE_URL = "";
   

  constructor() {
    this.initVitalStrings();
    this.initServerBaseUrl();
  }


  private initServerBaseUrl() {
    this.SERVER_BASE_URL = JV_BTReadings.getServerBaseUrl();
    console.log("SERVER_BASE_URL: " + this.SERVER_BASE_URL);

    this.TOKBOX_BASE_URL = this.SERVER_BASE_URL + "/vclinic/videochat";
  }


  public getOpenTokUrl(otApiKey, otSessionId, otToken, w, h) {
    let url = this.TOKBOX_BASE_URL 
                + "?"
                + "apiKey="+otApiKey
                + "&openTokSessionId="+otSessionId
                + "&openTokToken="+otToken
                + "&h=" + Math.floor(w)
                + "&w=" + Math.floor(h);

    return url;
  } 

  /**
   * Generate a random string with a prefix and a postfix of size n
   * @param prefix 
   * @param n 
   */
  public generateRandomString(prefix: string, n: number): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return prefix + text;
  }

 
  /**
   * Logout the current account
   */
  public logout() {
    console.log("Logging out ... ");
    location.href = "/logout";
  }


  /**
   * Make an AJAX GET request
   * @param url 
   * @param headers 
   * @param doneCallback 
   * @param failedCallback 
   * @param alwaysCallback 
   */
  public async ajaxGetCall(url, headers, doneCallback, failedCallback?, alwaysCallback?) {

    if (url == "" || typeof url == "undefined") {
      console.log("Enter a URL");
      return;
    }

    console.log("");
    console.log("AJAX GET: " + url);
    var ajax = $.ajax({
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
    .fail((response) => {
        console.log(response);
        if (typeof failedCallback == "function")
          failedCallback(response);
    })
    .always((response) => {
        console.log(response);
        if (typeof alwaysCallback == "function")
          alwaysCallback(response);
    }); 

  }


  /**
   * Make an AJAX POST Request call
   * @param url 
   * @param data 
   * @param headers 
   * @param doneCallback 
   * @param failedCallback 
   * @param alwaysCallback 
   */
  public async ajaxPostCall(url, data, headers, doneCallback, failedCallback?, alwaysCallback?) {

    if (url == "") {
      console.log("Enter a URL");
      return;
    }

    console.log("");
    console.log("AJAX POST: " + url);

    var ajax = $.ajax({
      method: "POST",
      url: url,
      data: data,
      headers: headers
    })
    .done((response) => {

      console.log("AJAX RESPONSE: ", response);
      console.log("");

      if (response.exception && response.body.includes("ACCESS DENIED")) {
        console.log("ACCESS DENIED");
        this.logout();
        return;
      }
      if (typeof doneCallback == "function")
        doneCallback(response);
    }).fail((response) => {
      console.log(response);
      if (typeof failedCallback == "function")
        failedCallback(response);
    }).always((response) => {
      console.log(response);
      if (typeof alwaysCallback == "function")
        alwaysCallback(response);
    });
    
  }



  /**
   * print all static properties of Object
   * @param object 
   */
  public async showStaticObjectVars(object) {
    console.log("VClinicState ... ")
    Object.keys(object).forEach((item, key) => { console.log("\t" + item + ": " + (object[item])) });
  }



  public getCurrentTimestamp():number {
    return JV_BTReadings.getCurrentTimestamp();
  }


  public readonly VITAL_TYPE_NONE = -5000;
	public readonly VITAL_TYPE_SPO2 = 1;
	public readonly VITAL_TYPE_WEIGHT = 2;
	public readonly VITAL_TYPE_BP = 4;
	public readonly VITAL_TYPE_ECG = 5;
	public readonly VITAL_TYPE_PKFLOW = 6;
	public readonly VITAL_TYPE_SUGAR = 7;
	public readonly VITAL_TYPE_TEMP = 8;

  private vitalString = [];

  public initVitalStrings() {
    this.vitalString[this.VITAL_TYPE_BP] = "Blood Pressure";
    this.vitalString[this.VITAL_TYPE_SPO2] = "Blood Sugar";
    this.vitalString[this.VITAL_TYPE_SUGAR] = "Blood Sugar";
    this.vitalString[this.VITAL_TYPE_WEIGHT] = "Body Weight";
    this.vitalString[this.VITAL_TYPE_NONE] = "None";
  }

  public getVitalStr(vital) {
    return this.vitalString[vital];
  }

}
