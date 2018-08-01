import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
import { Doctor } from '../components/doctor/doctor.model';
import { HOST } from '../shared/variables.constant';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctorChanges = new Subject<Doctor[]>();
  message = new Subject<string>();
  serverUrl = `${HOST}/doctors`;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Doctor[]>(this.serverUrl);
  }

  findById(id: number) {
    return this.http.get<Doctor>(`${this.serverUrl}/${id}`);
  }

  register(patient: Doctor) {
    return this.http.post(this.serverUrl, patient);
  }

  edit(patient: Doctor) {
    return this.http.put(this.serverUrl, patient);
  }

  remove(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
