package com.fral.medapp.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Entity
@Table(name="consultations")
public class Consultation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(optional=false)
	private Patient patient;

	@ManyToOne(optional=false)
	private Doctor doctor; 

	@ManyToOne(optional=false)
	private Specialty specialty;

	@JsonSerialize(using = ToStringSerializer.class)
	private LocalDateTime fecha;

	@OneToMany(mappedBy = "consultation", cascade = { CascadeType.PERSIST, CascadeType.MERGE,
			CascadeType.REMOVE }, fetch = FetchType.LAZY, orphanRemoval = true)
	private List<ConsultationDetail> consultationDetails;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
	}

	public List<ConsultationDetail> getConsultationDetails() {
		return consultationDetails;
	}

	public void setConsultationDetails(List<ConsultationDetail> consultationDetails) {
		this.consultationDetails = consultationDetails;
	}

}
