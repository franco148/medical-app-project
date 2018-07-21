package com.fral.medapp.dto;

import java.util.List;

import com.fral.medapp.model.Consultation;
import com.fral.medapp.model.MedicalExam;

public class ConsultationExamListDto {

	private Consultation consulta;
	private List<MedicalExam> lstExamen;
	
	
	
	public Consultation getConsulta() {
		return consulta;
	}
	public void setConsulta(Consultation consulta) {
		this.consulta = consulta;
	}
	public List<MedicalExam> getLstExamen() {
		return lstExamen;
	}
	public void setLstExamen(List<MedicalExam> lstExamen) {
		this.lstExamen = lstExamen;
	}
}
