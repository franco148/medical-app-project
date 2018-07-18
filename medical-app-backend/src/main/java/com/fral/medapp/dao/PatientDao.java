package com.fral.medapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fral.medapp.model.Patient;

public interface PatientDao extends JpaRepository<Patient, Integer> {

}
