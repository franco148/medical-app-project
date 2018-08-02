import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../shared/variables.constant';
import { Patient } from '../components/patient/patient.model';
import { Subject } from '../../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patientsChange = new Subject<Patient[]>();
  message = new Subject<string>();
  serverUrl = `${HOST}/patients`;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Patient[]>(this.serverUrl);
  }

  findById(id: number) {
    return this.http.get<Patient>(`${this.serverUrl}/${id}`);
  }

  register(patient: Patient) {
    return this.http.post(this.serverUrl, patient);
  }

  edit(patient: Patient) {
    return this.http.put(this.serverUrl, patient);
  }

  remove(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
