import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component';
import { PatientEditionComponent } from './components/patient/patient-edition/patient-edition.component';
import { ForbiddenPageComponent } from './components/forbidden-page/forbidden-page.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ExamComponent } from './components/exam/exam.component';
import { ExamEditionComponent } from './components/exam/exam-edition/exam-edition.component';
import { SpecialtyComponent } from './components/specialty/specialty.component';
import { SpecialtyEditionComponent } from './components/specialty/specialty-edition/specialty-edition.component';

const routes: Routes = [
  { path: 'forbidden403', component: ForbiddenPageComponent },
  { path: 'consultation', component: ConsultationComponent },
  { path: 'doctor', component: DoctorComponent },
  {
    path: 'patient',
    component: PatientComponent,
    children: [
      { path: 'new', component: PatientEditionComponent },
      { path: 'edition/:id', component: PatientEditionComponent }
    ]
  },
  {
    path: 'exam',
    component: ExamComponent,
    children: [
      { path: 'new', component: ExamEditionComponent },
      { path: 'edition/:id', component: ExamEditionComponent }
    ]
  },
  {
    path: 'specialty',
    component: SpecialtyComponent,
    children: [
      { path: 'new', component: SpecialtyEditionComponent },
      { path: 'edition/:id', component: SpecialtyEditionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
