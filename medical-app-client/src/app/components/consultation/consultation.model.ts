import { Patient } from '../patient/patient.model';
import { Doctor } from '../doctor/doctor.model';
import { Specialty } from '../specialty/specialty.model';
import { ConsultationDetail } from './consultation-detail.model';

export class Consultation {
    id: number;
    patient: Patient;
    date: Date;
    doctor: Doctor;
    specialty: Specialty;
    consultationDetails: ConsultationDetail[];
}
