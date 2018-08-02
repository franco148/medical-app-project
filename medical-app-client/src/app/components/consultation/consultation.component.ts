import { Component, OnInit } from '@angular/core';
import { Specialty } from '../specialty/specialty.model';
import { Patient } from '../patient/patient.model';
import { Doctor } from '../doctor/doctor.model';
import { Consultation } from './consultation.model';
import { Exam } from '../exam/exam.model';
import { ConsultationDetail } from './consultation-detail.model';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { ExamService } from '../../services/exam.service';
import { SpecialtyService } from '../../services/specialty.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { ConsultationService } from '../../services/consultation.service';
import { ConsultationExamList } from '../../models/consultation-exam-list.model';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  consultation: Consultation;

  patients: Patient[] = [];
  specialties: Specialty[] = [];
  doctors: Doctor[] = [];
  exams: Exam[] = [];

  consultationDetails: ConsultationDetail[] = [];
  selectedExams: Exam[] = [];

  diagnostic: string;
  treatment: string;
  selectedPatientId: number;
  selectedSpecialtyId: number;
  selectedDoctorId: number;
  selectedExamId: number;

  selectedDate: Date = new Date();
  maxDateValue: Date = new Date();

  message: string;

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private examService: ExamService,
              private specialtyService: SpecialtyService,
              public snackBar: MatSnackBar,
              private consultationService: ConsultationService) { }

  ngOnInit() {

    this.findAllPatients();
    this.findAllSpecialties();
    this.findAllDoctors();
    this.findAllExams();
  }

  findAllPatients() {
    this.patientService.findAll().subscribe(result => {
      this.patients = result;
    });
  }

  findAllSpecialties() {
    this.specialtyService.findAll().subscribe(result => {
      this.specialties = result;
    });
  }

  findAllDoctors() {
    this.doctorService.findAll().subscribe(result => {
      this.doctors = result;
    });
  }

  findAllExams() {
    this.examService.findAll().subscribe(result => {
      this.exams = result;
    });
  }

  addConsultationDetail() {
    if (this.diagnostic != null && this.treatment != null) {
      const consulDetail = new ConsultationDetail();
      consulDetail.diagnostic = this.diagnostic;
      consulDetail.treatment = this.treatment;

      this.consultationDetails.push(consulDetail);

      this.diagnostic = null;
      this.treatment = null;
    } else {
      this.message = 'You should add a diagnostic and treatment.';
      this.snackBar.open(this.message, 'Info', { duration: 2000 });
    }
  }

  removeDiagnostic(index: number) {
    this.consultationDetails.splice(index, 1);
  }

  saveNewExam() {
    if (this.selectedExamId > 0) {
      let counter = 0;

      for (let index = 0; index < this.selectedExams.length; index++) {
        const exam = this.selectedExams[index];
        if (exam.id === this.selectedExamId) {
          counter++;
          break;
        }
      }

      if (counter > 0) {
        this.message = 'The item is already in the Exam List';
        this.snackBar.open(this.message, 'Info', { duration: 2000 });
      } else {
        const exam = new Exam();
        exam.id = this.selectedExamId;

        this.examService.findById(this.selectedExamId).subscribe(result => {
          exam.name = result.name;
          this.selectedExams.push(exam);
        });
      }
    } else {
      this.message = 'You should add an exam';
      this.snackBar.open(this.message, 'Info', { duration: 2000 });
    }
  }

  registerConsultation() {
    const doctor = new Doctor();
    doctor.id = this.selectedDoctorId;

    const specialty = new Specialty();
    specialty.id = this.selectedSpecialtyId;

    const patient = new Patient();
    patient.id = this.selectedPatientId;

    this.consultation = new Consultation();
    this.consultation.specialty = specialty;
    this.consultation.patient = patient;
    this.consultation.doctor = doctor;
    this.consultation.consultationDetails = this.consultationDetails;
    this.consultation.date = this.selectedDate;

    const consultationExamList = new ConsultationExamList();
    consultationExamList.consultation = this.consultation;
    consultationExamList.examList = this.selectedExams;

    console.log('ConsultationExamList to be saved: ', consultationExamList);

    this.consultationService.register(consultationExamList).subscribe(result => {
      console.log('ConsultationExamList saved');
      this.snackBar.open('ConsultationExamList registered', 'Info', { duration: 2000 });
    });

    setTimeout(() => {
      this.cleanUserControls();
    }, 2000);
  }

  cleanUserControls() {
    this.consultationDetails = [];
    this.selectedExams = [];
    this.diagnostic = '';
    this.treatment = '';
    this.selectedPatientId = 0;
    this.selectedSpecialtyId = 0;
    this.selectedDoctorId = 0;
    this.selectedExamId = 0;
    this.selectedDate = new Date();
    this.selectedDate.setHours(0);
    this.selectedDate.setMinutes(0);
    this.selectedDate.setSeconds(0);
    this.selectedDate.setMilliseconds(0);
    this.message = '';
    this.consultation = new Consultation();
  }

  removeExam(index: number) {
    this.selectedExams.splice(index, 1);
  }

  registerButtonState() {
    return (this.consultationDetails.length === 0 ||
            this.selectedSpecialtyId === 0 ||
            this.selectedDoctorId === 0 ||
            this.selectedPatientId === 0);
  }

}
