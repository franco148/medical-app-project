package com.fral.medapp.dto;

import org.springframework.hateoas.ResourceSupport;

public class DoctorDto extends ResourceSupport {

	private int idDoctor;
	private String name;
	
	
	
	public int getIdDoctor() {
		return idDoctor;
	}
	public void setIdDoctor(int idDoctor) {
		this.idDoctor = idDoctor;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
