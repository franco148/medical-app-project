package com.fral.medapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fral.medapp.model.Doctor;

public interface DoctorDao extends JpaRepository<Doctor, Integer> {

}
