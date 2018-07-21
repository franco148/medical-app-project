package com.fral.medapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Patient information")
@Entity
@Table(name="patients")
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ApiModelProperty(notes = "Name should have at least 2 characters")
	@Size(min = 2, max = 20, message = "Name should have at least 2 characters")
	@Column(nullable=false, length=20)
	private String name;
	
	@ApiModelProperty(notes = "Last Name should have at least 2 characters")
	@Size(min = 2, max = 20, message = "Last Name should have at least 2 characters")
	@Column(nullable=false, length=70)
	private String lastName;
	
	@ApiModelProperty(notes = "DNI should have 8 characters")
	@Size(min = 8, max = 8, message = "DNI should have 8 characters")
	@Column(nullable=false, length=8)
	private String dni;
	
	@ApiModelProperty(notes = "Address should have at least 3 characters")
	@Size(min = 3, message = "Address should have at least 3 characters")
	@Column(length=150)
	private String address;
	
	@ApiModelProperty(notes = "Phone should have 9 characters")
	@Size(min = 9, max = 9, message = "Phone should have 9 characters")
	@Column(length=9)
	private String phone;

	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
