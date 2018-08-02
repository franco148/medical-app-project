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
    this.patientService.patientsChange
        .subscribe(patientsData => {
          this.patientsList = patientsData;
          this.dataSource = new MatTableDataSource(this.patientsList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.patientService.message.subscribe(data => {
            this.snackBar.open(data, 'Info', { duration: 2000 });
          });
        });

    this.patientService.findAll().subscribe(patientData => {
      this.patientsList = patientData;
      this.dataSource = new MatTableDataSource(this.patientsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    this.dataSource.filter = filterValue;
  }

  remove(id: number) {
    this.patientService.remove(id).subscribe(result => {
      this.patientService.findAll().subscribe(data => {
        this.patientsList = data;
        this.dataSource = new MatTableDataSource(this.patientsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

}
