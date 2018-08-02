import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { Exam } from '../components/exam/exam.model';
import { HOST } from '../shared/variables.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  examChanges = new Subject<Exam[]>();
  message = new Subject<string>();
  serverUrl = `${HOST}/medical-exams`;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Exam[]>(this.serverUrl);
  }

  findById(id: number) {
    return this.http.get<Exam>(`${this.serverUrl}/${id}`);
  }

  register(patient: Exam) {
    return this.http.post(this.serverUrl, patient);
  }

  edit(patient: Exam) {
    return this.http.put(this.serverUrl, patient);
  }

  remove(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
