import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent, VitalChartsDialog, PhotoDialog } from './app/app.component';
import { EVisitViewComponent } from './evisit-view/evisit-view.component';
import { SharedService } from './services/shared-service.service';
import { JavaCallService } from './services/java-call.service';
import { DevicelistService } from './services/devicelist.service';
import { VitalReadingViewComponent } from './vital-reading-view/vital-reading-view.component';
import { EcgViewComponent } from './ecg-view/ecg-view.component';
import { ChfCheckupComponent, YoutubeDialog } from './chf-checkup/chf-checkup.component';

import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EVisitViewComponent,
    VitalReadingViewComponent,
    EcgViewComponent,
    ChfCheckupComponent,
    PhotoDialog,
    YoutubeDialog,
    VitalChartsDialog,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,    
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule
  ],
  entryComponents: [YoutubeDialog, VitalChartsDialog, PhotoDialog],
  providers: [SharedService, JavaCallService, DevicelistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 