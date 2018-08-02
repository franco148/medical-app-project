package com.fral.medapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fral.medapp.model.Menu;
import com.fral.medapp.service.MenuService;

@RestController
@RequestMapping("/menus")
public class MenuRestController {

	@Autowired
	private MenuService menuService;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Menu>> findAll() {
		
		return ResponseEntity.ok(menuService.getAll());
	}
}
