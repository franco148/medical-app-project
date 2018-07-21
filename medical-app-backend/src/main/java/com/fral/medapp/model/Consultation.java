package com.fral.medapp.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
	//@DateTimeFormat(iso = DateTimeFormatter.ofPattern("yyyy-MM-dd"))
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime date;

	@OneToMany(mappedBy = "consultation", cascade = { CascadeType.PERSIST, CascadeType.MERGE,
			CascadeType.REMOVE }, fetch = FetchType.LAZY, orphanRemoval = true)
	private List<ConsultationDetail> consultationDetails;
	
	@ManyToMany
	@JoinTable(
		name = "ConsultationExamsRelationships",
		joinColumns = @JoinColumn(name = "consultationId"),
		inverseJoinColumns = @JoinColumn(name = "medicalExamId")
	)
	//@JsonManagedReference
	private List<MedicalExam> medicalExams = new ArrayList<>();

	
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

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public List<ConsultationDetail> getConsultationDetails() {
		return consultationDetails;
	}

	public void setConsultationDetails(List<ConsultationDetail> consultationDetails) {
		this.consultationDetails = consultationDetails;
	}

	public List<MedicalExam> getMedicalExams() {
		return medicalExams;
	}

	public void setMedicalExams(List<MedicalExam> medicalExams) {
		this.medicalExams = medicalExams;
	}
	
	public void addMedicalExam(MedicalExam medicalExam) {
		this.medicalExams.add(medicalExam);
	}

}
