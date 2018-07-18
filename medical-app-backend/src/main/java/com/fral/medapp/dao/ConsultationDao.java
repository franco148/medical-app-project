package com.fral.medapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fral.medapp.model.Consultation;

public interface ConsultationDao extends JpaRepository<Consultation, Integer> {

}
