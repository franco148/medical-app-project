package com.fral.medapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fral.medapp.dao.DoctorDao;
import com.fral.medapp.model.Doctor;

@Service
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private DoctorDao doctorDao;
	
	
	
	@Override
	public Doctor create(Doctor entity) {
		
		return doctorDao.save(entity);
	}

	@Override
	public Doctor update(Doctor entity) {
		
		return doctorDao.save(entity);
	}

	@Override
	public void delete(int id) {
		doctorDao.delete(id);
	}

	@Override
	public Doctor findById(int id) {
		
		return doctorDao.findOne(id);
	}

	@Override
	public List<Doctor> getAll() {
		
		return doctorDao.findAll();
	}

}
