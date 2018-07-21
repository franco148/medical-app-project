package com.fral.medapp.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fral.medapp.dao.ConsultationDao;
import com.fral.medapp.dao.MedicalExamDao;
import com.fral.medapp.model.Consultation;

@Service
public class ConsultationServiceImpl implements ConsultationService {

	@Autowired
	private ConsultationDao consultationDao;
	
//	@Autowired
//	private MedicalExamDao medicalExamDao;
	
	
	@Transactional
	@Override
	public Consultation create(Consultation entity) {

		entity.getConsultationDetails().forEach(dc -> dc.setConsultation(entity));
		//Consultation savedConsultation = consultationDao.save(entity);
		
		//entity.getMedicalExams().forEach(me -> );
		
		return consultationDao.save(entity);
	}

	@Override
	public Consultation update(Consultation entity) {
		
		return consultationDao.save(entity);
	}

	@Override
	public void delete(int id) {
		consultationDao.delete(id);
	}

	@Override
	public Consultation findById(int id) {
		
		return consultationDao.findOne(id);
	}

	@Override
	public List<Consultation> getAll() {
		
		return consultationDao.findAll();
	}

}
