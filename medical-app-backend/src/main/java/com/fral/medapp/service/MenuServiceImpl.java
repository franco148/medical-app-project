package com.fral.medapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fral.medapp.dao.MenuDao;
import com.fral.medapp.model.Menu;

@Service
public class MenuServiceImpl implements MenuService {
	
	@Autowired
	private MenuDao menuDao;

	@Override
	public Menu create(Menu entity) {
		// TODO Auto-generated method stub
		return menuDao.save(entity);
	}

	@Override
	public Menu update(Menu entity) {
		// TODO Auto-generated method stub
		return menuDao.save(entity);
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		menuDao.delete(id);
	}

	@Override
	public Menu findById(int id) {
		// TODO Auto-generated method stub
		return menuDao.findOne(id);
	}

	@Override
	public List<Menu> getAll() {
		// TODO Auto-generated method stub
		return menuDao.findAll();
	}

	@Override
	public List<Menu> findMenuByUser(String name) {
		// TODO Auto-generated method stub
		List<Menu> menusByUser = new ArrayList<>();
		
		//menuDao.
		
		return null;
	}

	
}
