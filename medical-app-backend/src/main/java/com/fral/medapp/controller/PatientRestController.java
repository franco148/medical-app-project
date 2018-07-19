package com.fral.medapp.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
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

import com.fral.medapp.model.Patient;
import com.fral.medapp.service.PatientService;

@RestController
@RequestMapping("/patients")
public class PatientRestController {

	@Autowired
	private PatientService service;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Patient>> listar() {
		List<Patient> pacientes = new ArrayList<>();
		try {
			pacientes = service.getAll();
		} catch (Exception e) {
			return new ResponseEntity<List<Patient>>(pacientes, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Patient>>(pacientes, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Resource<Patient> listarId(@PathVariable("id") Integer id) {
		Patient paciente = new Patient();
		paciente = service.findById(id);
		if (paciente == null) {
			throw new EntityNotFoundException("ID: " + id);
		}

		Resource<Patient> resource = new Resource<Patient>(paciente);
		ControllerLinkBuilder linkTo = linkTo(methodOn(this.getClass()).listar());
		resource.add(linkTo.withRel("all-pacientes"));
		return resource;
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> registrar(@Valid @RequestBody Patient paciente) {
		
		Patient registeredPatient = service.create(paciente);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(registeredPatient.getId()).toUri();

		return ResponseEntity.created(location).build();
	}

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Integer> actualizar(@RequestBody Patient paciente) {
		int resultado = 0;
		try {
			service.update(paciente);
			resultado = 1;
		} catch (Exception e) {
			resultado = 0;
		}

		return new ResponseEntity<Integer>(resultado, HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public void eliminar(@PathVariable Integer id) {

		Patient pac = service.findById(id);
		if (pac == null) {
			throw new EntityNotFoundException("ID: " + id);
		} else {
			service.delete(id);
		}
	}
}
