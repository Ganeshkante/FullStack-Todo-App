package com.in28minutes.rest.webservices.restfulwebservices.todo.repository;

import com.in28minutes.rest.webservices.restfulwebservices.todo.Todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {
	
	List<Todo> findByUsername(String username);
}
