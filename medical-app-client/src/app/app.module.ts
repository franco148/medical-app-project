import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MaterialModule } from './material/material.module';


import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import { AppRoutingModule } from './app-routing.module';
import { PatientEditionComponent } from './components/patient/patient-edition/patient-edition.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { SpecialtyComponent } from './components/specialty/specialty.component';
import { ExamComponent } from './components/exam/exam.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ForbiddenPageComponent } from './components/forbidden-page/forbidden-page.component';
import { ExamEditionComponent } from './components/exam/exam-edition/exam-edition.component';
import { SpecialtyEditionComponent } from './components/specialty/specialty-edition/specialty-edition.component';
import { DoctorDialogComponent } from './components/doctor/doctor-dialog/doctor-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientEditionComponent,
    ConsultationComponent,
    SpecialtyComponent,
    ExamComponent,
    DoctorComponent,
    ForbiddenPageComponent,
    ExamEditionComponent,
    SpecialtyEditionComponent,
    DoctorDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
