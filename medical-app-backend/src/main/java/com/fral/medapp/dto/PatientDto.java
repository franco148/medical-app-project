package com.fral.medapp.dto;

import org.springframework.hateoas.ResourceSupport;

//https://blog.zenika.com/2012/06/13/hateoas-with-spring-mvc-rest/
public class PatientDto extends ResourceSupport {

	private int idPatient;
	private String fullName;
	
	
	
	public int getIdPatient() {
		return idPatient;
	}
	public void setIdPatient(int idPatient) {
		this.idPatient = idPatient;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}	
}
