import { Component, OnInit } from '@angular/core';
import { Exam } from '../exam.model';
import { FormGroup, FormControl } from '../../../../../node_modules/@angular/forms';
import { ExamService } from '../../../services/exam.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-exam-edition',
  templateUrl: './exam-edition.component.html',
  styleUrls: ['./exam-edition.component.css']
})
export class ExamEditionComponent implements OnInit {

  id: number;
  exam: Exam;
  form: FormGroup;
  isEdicion = false;

  constructor(private examService: ExamService, private route: ActivatedRoute, private router: Router) {

    this.exam = new Exam();
    this.form = new FormGroup({
      'id': new FormControl(0),
      'name': new FormControl(''),
      'description': new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.isEdicion = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if (this.isEdicion) {
      this.examService.findById(this.id).subscribe(data => {
        const id = data.id;
        const name = data.name;
        const description = data.description;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'name': new FormControl(name),
          'description': new FormControl(description)
        });
      });
    }
  }

  operate() {
    this.exam.id = this.form.value['id'];
    this.exam.name = this.form.value['name'];
    this.exam.description = this.form.value['description'];

    if (this.exam != null && this.exam.id > 0) {
      this.examService.edit(this.exam).subscribe(data => {
        this.examService.findAll().subscribe(especialidad => {
          this.examService.examChanges.next(especialidad);
          this.examService.message.next('Exam has been edited successfully.');
        });
      });
    } else {
      this.examService.register(this.exam).subscribe(data => {
        this.examService.findAll().subscribe(especialidad => {
          this.examService.examChanges.next(especialidad);
          this.examService.message.next('Exam has been registered successfully.');
        });
      });
    }

    this.examService.findAll().subscribe(data => {
      this.examService.examChanges.next(data);
    });

    this.router.navigate(['exam']);
  }
}
