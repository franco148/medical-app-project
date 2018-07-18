package com.fral.medapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fral.medapp.dao.SpecialtyDao;
import com.fral.medapp.model.Specialty;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {

	@Autowired
	private SpecialtyDao specialtyDao;
	
	
	@Override
	public Specialty create(Specialty entity) {
		
		return specialtyDao.save(entity);
	}

	@Override
	public Specialty update(Specialty entity) {
		
		return specialtyDao.save(entity);
	}

	@Override
	public void delete(int id) {
		specialtyDao.delete(id);
	}

	@Override
	public Specialty findById(int id) {
		
		return specialtyDao.findOne(id);
	}

	@Override
	public List<Specialty> getAll() {
		
		return specialtyDao.findAll();
	}

}
