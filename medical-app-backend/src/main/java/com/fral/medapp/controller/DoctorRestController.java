package com.fral.medapp.controller;

import java.net.URI;
import java.util.ArrayList;
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
import com.fral.medapp.model.Doctor;
import com.fral.medapp.service.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorRestController {

	@Autowired
	private DoctorService service;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Doctor>> listar() {
		List<Doctor> medicos = new ArrayList<>();
		medicos = service.getAll();
		return new ResponseEntity<List<Doctor>>(medicos, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Doctor> listarId(@PathVariable("id") Integer id) {
		Doctor medico = service.findById(id);
		
		if (medico == null) {
			throw new EntityNotFoundException("Id: " + id);
		}
		return new ResponseEntity<Doctor>(medico, HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> registrar(@Valid @RequestBody Doctor medico) {
		
		service.create(medico);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					   .buildAndExpand(medico.getId()).toUri();

		return ResponseEntity.created(location).build();
	}

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> actualizar(@Valid @RequestBody Doctor medico) {
		
		service.update(medico);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public void eliminar(@PathVariable("id") Integer id) {
		
		Doctor doctor = service.findById(id);
		if (doctor == null) {
			throw new EntityNotFoundException("Id: " + id);
		}
		
		service.delete(id);

	}
}
