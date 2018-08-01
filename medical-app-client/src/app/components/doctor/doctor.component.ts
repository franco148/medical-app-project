import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from './doctor.model';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DoctorService } from '../../services/doctor.service';
import { DoctorDialogComponent } from './doctor-dialog/doctor-dialog.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorsList: Doctor[] = [];
  displayedColumns = ['id', 'names', 'lastNames', 'cmp', 'actions'];
  dataSource: MatTableDataSource<Doctor>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private doctorService: DoctorService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.doctorService.doctorChanges
        .subscribe(patientsData => {
          this.doctorsList = patientsData;
          this.dataSource = new MatTableDataSource(this.doctorsList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

    this.doctorService.message.subscribe(data => {
      this.snackBar.open(data, 'Info', { duration: 2000 });
    });

    this.doctorService.findAll().subscribe(doctorsData => {
      this.doctorsList = doctorsData;
      this.dataSource = new MatTableDataSource(this.doctorsList);
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
    this.doctorService.remove(id).subscribe(result => {
      if (result === 1) {
        this.doctorService.findAll().subscribe(doctors => {
          this.doctorService.doctorChanges.next(doctors);
          this.doctorService.message.next(`Doctor with Id: ${id} has been removed successfully`);
        });
      } else {
        this.doctorService.message.next(`Doctor with Id: ${id} could not be removed.`);
      }
    });
  }

  openDialog(doctor: Doctor): void {
    const doc = doctor != null ? doctor : new Doctor();
    // let dialogRef = this.dialog.open()
    this.dialog.open(DoctorDialogComponent, {
      width: '250px',
      disableClose: true, // modal will not able to be closed by esc key.
      data: doc
    });
  }
}
