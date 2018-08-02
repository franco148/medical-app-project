import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Specialty } from './specialty.model';
import { SpecialtyService } from '../../services/specialty.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {

  displayedColumns = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Specialty>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mensaje: string;

  constructor(private specialtyService: SpecialtyService,
              public route: ActivatedRoute,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.specialtyService.specialtyChanges.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.specialtyService.message.subscribe(data => {
      this.snackBar.open(data, null, {
        duration: 2000,
      });
    });

    this.specialtyService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  remove(specialty: Specialty): void {
    this.specialtyService.remove(specialty.id).subscribe(data => {
      if (data === 1) {
        this.specialtyService.findAll().subscribe(result => {
          this.specialtyService.specialtyChanges.next(result);
          this.specialtyService.message.next('Specialty has been removed successfully.');
        });
      } else {
        this.specialtyService.message.next('Specialty could not be removed');
      }
    });
  }
}
