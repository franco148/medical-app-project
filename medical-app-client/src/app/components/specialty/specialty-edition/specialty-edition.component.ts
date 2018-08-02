import { Component, OnInit } from '@angular/core';
import { Specialty } from '../specialty.model';
import { FormGroup, FormControl } from '../../../../../node_modules/@angular/forms';
import { SpecialtyService } from '../../../services/specialty.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-specialty-edition',
  templateUrl: './specialty-edition.component.html',
  styleUrls: ['./specialty-edition.component.css']
})
export class SpecialtyEditionComponent implements OnInit {

  id: number;
  specialty: Specialty;
  form: FormGroup;
  isEdition = false;

  constructor(private specialtyService: SpecialtyService,
              private route: ActivatedRoute,
              private router: Router) {
    this.specialty = new Specialty();
    this.form = new FormGroup({
      'id': new FormControl(0),
      'name': new FormControl('')
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.isEdition = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if (this.isEdition) {
      this.specialtyService.findById(this.id).subscribe(result => {
        const id = result.id;
        const name = result.name;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'name': new FormControl(name)
        });
      });
    }
  }

  operate() {
    this.specialty.id = this.form.value['id'];
    this.specialty.name = this.form.value['name'];

    if (this.specialty != null && this.specialty.id > 0) {
      this.specialtyService.edit(this.specialty).subscribe(data => {
        this.specialtyService.findAll().subscribe(result => {
          this.specialtyService.specialtyChanges.next(result);
          this.specialtyService.message.next('Specialty has been updated successfully.');
        });
      });
    } else {
      this.specialtyService.register(this.specialty).subscribe(data => {
        this.specialtyService.findAll().subscribe(result => {
          this.specialtyService.specialtyChanges.next(result);
          this.specialtyService.message.next('Specialty has been registered successfully.');
        });
      });
    }

    this.router.navigate(['specialty']);
  }
}
