package com.fral.medapp.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fral.medapp.exception.EntityNotFoundException;
import com.fral.medapp.model.MedicalExam;
import com.fral.medapp.service.MedicalExamService;

@RestController
@RequestMapping("/medical-exams")
public class MedicalExamRestController {

	@Autowired
	private MedicalExamService service;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<MedicalExam>> listar() {
		List<MedicalExam> examenes = service.getAll();
		
		return new ResponseEntity<List<MedicalExam>>(examenes, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MedicalExam> listarId(@PathVariable("id") Integer id) {
		MedicalExam examen = service.findById(id);
		
		if (examen == null) {
			throw new EntityNotFoundException("Id: " + id);
		}
		return new ResponseEntity<MedicalExam>(examen, HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Integer> registrar(@Valid @RequestBody MedicalExam examen) {
		service.create(examen);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					   .buildAndExpand(examen.getId()).toUri();

		return ResponseEntity.created(location).build();
	}

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> actualizar(@Valid @RequestBody MedicalExam examen) {
		service.update(examen);

		return new ResponseEntity<Object>(HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public void eliminar(@PathVariable Integer id) {
		MedicalExam medicalExam = service.findById(id);
		
		if (medicalExam == null) {
			throw new EntityNotFoundException("Id: " + id);
		}

		service.delete(id);
	}
}
