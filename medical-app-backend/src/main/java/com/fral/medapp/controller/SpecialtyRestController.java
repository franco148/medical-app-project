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
import com.fral.medapp.model.Specialty;
import com.fral.medapp.service.SpecialtyService;

@RestController
@RequestMapping("/specialties")
public class SpecialtyRestController {

	@Autowired
	private SpecialtyService service;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Specialty>> listar() {
		List<Specialty> especialidades = new ArrayList<>();
		especialidades = service.getAll();
		return new ResponseEntity<List<Specialty>>(especialidades, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Specialty> listarId(@PathVariable("id") Integer id) {
		Specialty especialidad = service.findById(id);

		if (especialidad == null) {
			throw new EntityNotFoundException("Id: " + id);
		}
		return new ResponseEntity<Specialty>(especialidad, HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> registrar(@Valid @RequestBody Specialty especialidad) {
		
		service.create(especialidad);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				       .buildAndExpand(especialidad.getId()).toUri();

		return ResponseEntity.created(location).build();
	}

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> actualizar(@Valid @RequestBody Specialty especialidad) {
		
		service.update(especialidad);

		return new ResponseEntity<Object>(HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public void eliminar(@PathVariable Integer id) {
		
		Specialty specialty = service.findById(id);

		if (specialty == null) {
			throw new EntityNotFoundException("Id: " + id);
		}
		
		service.delete(id);
	}

}
