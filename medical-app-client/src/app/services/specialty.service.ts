import { Injectable } from '@angular/core';
import { Specialty } from '../components/specialty/specialty.model';
import { Subject } from '../../../node_modules/rxjs';
import { HOST } from '../shared/variables.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  specialtyChanges = new Subject<Specialty[]>();
  message = new Subject<string>();
  serverUrl = `${HOST}/specialties`;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Specialty[]>(this.serverUrl);
  }

  findById(id: number) {
    return this.http.get<Specialty>(`${this.serverUrl}/${id}`);
  }

  register(patient: Specialty) {
    return this.http.post(this.serverUrl, patient);
  }

  edit(patient: Specialty) {
    return this.http.put(this.serverUrl, patient);
  }

  remove(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
