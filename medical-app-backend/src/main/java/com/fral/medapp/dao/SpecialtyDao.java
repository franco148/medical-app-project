package com.fral.medapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fral.medapp.model.Specialty;

public interface SpecialtyDao extends JpaRepository<Specialty, Integer> {

}
