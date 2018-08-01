import { Component, OnInit, Inject } from '@angular/core';
import { Doctor } from '../doctor.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-dialog',
  templateUrl: './doctor-dialog.component.html',
  styleUrls: ['./doctor-dialog.component.css']
})
export class DoctorDialogComponent implements OnInit {

  doctor: Doctor;

  constructor(public dialogRef: MatDialogRef<DoctorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Doctor,
              private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctor = new Doctor();
    this.doctor.id = this.data.id;
    this.doctor.name = this.data.name;
    this.doctor.lastName = this.data.lastName;
    this.doctor.cmp = this.data.cmp;
  }

  operate() {
    if (this.doctor != null && this.doctor.id > 0) {
      this.doctorService.edit(this.doctor).subscribe(result => {
        this.doctorService.findAll().subscribe(doctors => {
          this.doctorService.doctorChanges.next(doctors);
          this.doctorService.message.next('Doctor edited successfully.');
        });
      });
    } else {
      this.doctorService.register(this.doctor).subscribe(result => {
        this.doctorService.findAll().subscribe(doctors => {
          this.doctorService.doctorChanges.next(doctors);
          this.doctorService.message.next('New doctor has been registered.');
        });
      });
    }
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
    this.doctorService.message.next('Edit doctor modal closed.');
  }

}
