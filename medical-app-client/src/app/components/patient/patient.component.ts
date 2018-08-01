import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';


import { Patient } from './patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patientsList: Patient[] = [];
  displayedColumns = ['id', 'names', 'lastNames', 'actions'];
  dataSource: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientService: PatientService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.patientService.findAllPatients()
        .subscribe(patientsData => {
          this.patientsList = patientsData;
          this.dataSource = new MatTableDataSource(this.patientsList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // this.patientService
        });
  }

}
