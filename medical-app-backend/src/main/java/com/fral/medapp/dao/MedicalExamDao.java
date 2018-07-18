package com.fral.medapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fral.medapp.model.MedicalExam;

public interface MedicalExamDao extends JpaRepository<MedicalExam, Integer> {

}
