package com.fral.medapp.service;

import java.util.List;

import com.fral.medapp.model.Menu;

public interface MenuService extends MedAppCrudService<Menu> {

	List<Menu> findMenuByUser(String name);
}
