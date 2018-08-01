import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Patient } from '../patient.model';
import { PatientService } from './../../../services/patient.service';


@Component({
  selector: 'app-patient-edition',
  templateUrl: './patient-edition.component.html',
  styleUrls: ['./patient-edition.component.css']
})
export class PatientEditionComponent implements OnInit {

  id: number;
  patient: Patient;
  form: FormGroup;
  isEdited = false;

  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private router: Router) {
    this.patient = new Patient();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'names': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      'lastNames': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      'dni': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'address': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    });
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.isEdited = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if (this.isEdited) {
      this.patientService.findPatientById(this.id).subscribe(data => {

        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'names': new FormControl(data.name),
          'lastNames': new FormControl(data.lastName),
          'dni': new FormControl(data.dni),
          'address': new FormControl(data.address),
          'phone': new FormControl(data.phone)
        });
      });
    }
  }

  operate() {
    this.patient.id = this.form.value['id'];
    this.patient.name = this.form.value['names'];
    this.patient.lastName = this.form.value['lastNames'];
    this.patient.dni = this.form.value['dni'];
    this.patient.address = this.form.value['address'];
    this.patient.phone = this.form.value['phone'];

    if (this.isEdited) {
      // Then update
      this.patientService.edit(this.patient).subscribe(data => {

        this.patientService.findAllPatients().subscribe(patients => {
          this.patientService.patientsChange.next(patients);
          this.patientService.message.next('Patient has been updated successfully');
        });
      });
    } else {
      // Then insert
      this.patientService.register(this.patient).subscribe(data => {

        this.patientService.findAllPatients().subscribe(patients => {
          this.patientService.patientsChange.next(patients);
          this.patientService.message.next('Patient has been added successfully');
        });
      });
    }

    this.router.navigate(['patient']);
  }
}
