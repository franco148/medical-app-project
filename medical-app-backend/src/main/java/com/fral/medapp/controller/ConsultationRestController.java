package com.fral.medapp.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fral.medapp.dto.ConsultationDto;
import com.fral.medapp.model.Consultation;
import com.fral.medapp.service.ConsultationService;

@RestController
@RequestMapping("/consultations")
public class ConsultationRestController {

	@Autowired
	private ConsultationService service;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Consultation>> listar() {
		List<Consultation> consultas = new ArrayList<>();
		consultas = service.getAll();
		return new ResponseEntity<List<Consultation>>(consultas, HttpStatus.OK);
	}

	@GetMapping(value = "/hateoas", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ConsultationDto> listarHateoas() {
		List<Consultation> consultationResultList = new ArrayList<>();
		List<ConsultationDto> consultasDTO = new ArrayList<>();
		consultationResultList = service.getAll();

		for (Consultation consult : consultationResultList) {
			ConsultationDto dto = new ConsultationDto();
			dto.setIdConsultation(consult.getId());
			dto.setDoctor(consult.getDoctor());
			dto.setPatient(consult.getPatient());

			ControllerLinkBuilder linkTo = linkTo(methodOn(ConsultationRestController.class).listarId((consult.getId())));
			dto.add(linkTo.withSelfRel());
			consultasDTO.add(dto);
			
			ControllerLinkBuilder linkTo1 = linkTo(methodOn(PatientRestController.class).listarId((consult.getPatient().getId())));
			dto.add(linkTo1.withSelfRel());
			consultasDTO.add(dto);
			
			ControllerLinkBuilder linkTo2 = linkTo(methodOn(DoctorRestController.class).listarId((consult.getDoctor().getId())));
			dto.add(linkTo2.withSelfRel());		
			consultasDTO.add(dto);						
		}
		return consultasDTO;
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Consultation> listarId(@PathVariable("id") Integer id) {
		Consultation c = new Consultation();
		try {
			c = service.findById(id);
		} catch (Exception e) {
			return new ResponseEntity<Consultation>(c, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<Consultation>(c, HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Consultation> registrar(@RequestBody Consultation consulta) {
		Consultation c = new Consultation();
		try {
			c = service.create(consulta);
		} catch (Exception e) {
			return new ResponseEntity<Consultation>(c, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Consultation>(c, HttpStatus.OK);
	}
}
