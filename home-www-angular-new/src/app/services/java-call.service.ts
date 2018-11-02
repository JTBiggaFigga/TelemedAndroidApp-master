import { Injectable } from '@angular/core';

declare var JV_JSReferences:any;

@Injectable()
export class JavaCallService {

  constructor() { }

  public setMainAppReferenceStr(refStr:string) {
    if(typeof JV_JSReferences != "undefined") {
      JV_JSReferences.setMainAppReferenceString(refStr);
    }
  }

}
