import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Exam } from './exam.model';
import { ExamService } from '../../services/exam.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  displayedColumns = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Exam>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mensaje: string;

  constructor(private examService: ExamService,
              public route: ActivatedRoute,
              public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.examService.examChanges.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examService.message.subscribe(data => {
      this.snackBar.open(data, null, {
        duration: 2000,
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  remove(exam: Exam): void {
    this.examService.remove(exam.id).subscribe(data => {
      if (data === 1) {
        this.examService.findAll().subscribe(result => {
          this.examService.examChanges.next(result);
          this.examService.message.next('Exam has been removed successfully.');
        });
      }
    });
  }
}
