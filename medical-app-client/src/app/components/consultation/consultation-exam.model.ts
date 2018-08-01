import { Consultation } from './consultation.model';
import { Exam } from '../exam/exam.model';


export class ConsultationExam {
    consultation: Consultation;
    examList: Exam[];
}
