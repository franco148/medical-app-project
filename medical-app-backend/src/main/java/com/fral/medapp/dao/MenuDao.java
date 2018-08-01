package com.fral.medapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fral.medapp.model.Menu;

public interface MenuDao extends JpaRepository<Menu, Integer> {

}
