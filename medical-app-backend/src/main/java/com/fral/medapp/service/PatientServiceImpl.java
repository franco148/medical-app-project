package com.fral.medapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fral.medapp.dao.PatientDao;
import com.fral.medapp.model.Patient;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientDao patientDao;
	
	
	@Override
	public Patient create(Patient entity) {
		
		return patientDao.save(entity);
	}

	@Override
	public Patient update(Patient entity) {
		
		return patientDao.save(entity);
	}

	@Override
	public void delete(int id) {
		patientDao.delete(id);
	}

	@Override
	public Patient findById(int id) {
		
		return patientDao.findOne(id);
	}

	@Override
	public List<Patient> getAll() {
		
		return patientDao.findAll();
	}

}
