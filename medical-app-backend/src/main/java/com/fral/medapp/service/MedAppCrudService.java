package com.fral.medapp.service;

import java.util.List;

public interface MedAppCrudService<T> {

	T create(T entity);

	T update(T entity);

	void delete(int id);

	T findById(int id);

	List<T> getAll();

}
