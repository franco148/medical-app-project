import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../shared/variables.constant';
import { Patient } from '../components/patient/patient.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  serverUrl: string = `${HOST}/patients`;

  constructor(private http: HttpClient) { }

  findAllPatients() {
    return this.http.get<Patient[]>(this.serverUrl);
  }

  findPatientById(id: number) {
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
