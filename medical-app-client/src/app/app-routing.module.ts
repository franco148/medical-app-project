import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component';
import { PatientEditionComponent } from './components/patient/patient-edition/patient-edition.component';

const routes: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
    children: [
      { path: 'new', component: PatientEditionComponent },
      { path: 'edition/:id', component: PatientEditionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
