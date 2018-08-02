import { Injectable } from '@angular/core';
import { HOST } from '../shared/variables.constant';
import { HttpClient } from '@angular/common/http';
import { ConsultationExamList } from '../models/consultation-exam-list.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  serverUrl = `${HOST}/consultations`;

  constructor(private http: HttpClient) { }

  register(consultationDto: ConsultationExamList) {
    return this.http.post(this.serverUrl, consultationDto);
  }
}
