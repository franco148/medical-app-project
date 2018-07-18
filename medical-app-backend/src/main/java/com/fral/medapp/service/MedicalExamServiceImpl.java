package com.fral.medapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fral.medapp.dao.MedicalExamDao;
import com.fral.medapp.model.MedicalExam;

@Service
public class MedicalExamServiceImpl implements MedicalExamService {

	@Autowired
	private MedicalExamDao medicalExamDao;
	
	
	@Override
	public MedicalExam create(MedicalExam entity) {
		
		return medicalExamDao.save(entity);
	}

	@Override
	public MedicalExam update(MedicalExam entity) {
		
		return medicalExamDao.save(entity);
	}

	@Override
	public void delete(int id) {
		medicalExamDao.delete(id);
	}

	@Override
	public MedicalExam findById(int id) {
		
		return medicalExamDao.findOne(id);
	}

	@Override
	public List<MedicalExam> getAll() {
		
		return medicalExamDao.findAll();
	}

}
