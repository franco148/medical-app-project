package com.fral.medapp.dto;

import org.springframework.hateoas.ResourceSupport;

import com.fral.medapp.model.Doctor;
import com.fral.medapp.model.Patient;

public class ConsultationDto extends ResourceSupport {

	private int idConsultation;
	private Doctor doctor;
	private Patient patient;
	
	
	
	
	public int getIdConsultation() {
		return idConsultation;
	}
	public void setIdConsultation(int idConsultation) {
		this.idConsultation = idConsultation;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
}
