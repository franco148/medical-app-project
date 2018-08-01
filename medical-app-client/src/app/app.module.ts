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


@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientEditionComponent,
    ConsultationComponent,
    SpecialtyComponent
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
