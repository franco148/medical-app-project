package com.fral.medapp.dto;

import java.util.List;

import com.fral.medapp.model.Consultation;
import com.fral.medapp.model.MedicalExam;

public class ConsultationExamListDto {

	private Consultation consultation;
	private List<MedicalExam> medicalExamsList;
	
	
	
	public Consultation getConsultation() {
		return consultation;
	}
	public void setConsultation(Consultation consultation) {
		this.consultation = consultation;
	}
	public List<MedicalExam> getMedicalExamsList() {
		return medicalExamsList;
	}
	public void setMedicalExamsList(List<MedicalExam> medicalExamsList) {
		this.medicalExamsList = medicalExamsList;
	}
}
