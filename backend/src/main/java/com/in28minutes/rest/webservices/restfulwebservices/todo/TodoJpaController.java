package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.in28minutes.rest.webservices.restfulwebservices.todo.repository.TodoRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TodoJpaController {
	
	@Autowired
	private TodoService ts;
	
	@Autowired
	private TodoRepository tr;
 
	@GetMapping("/user/{username}/todo")
	public List<Todo> retriveTodos(@PathVariable String username){
//		return ts.findByUsername(username);
		return tr.findByUsername(username);
	}
	@GetMapping("/user/{username}/todo/{id}")
	public Todo retriveTodo(@PathVariable String username,@PathVariable int id){
//		return ts.findById(id);  
		return tr.findById(id).get();
	}
	@DeleteMapping("/user/{username}/todo/{id}")
	public ResponseEntity<Void> deleteTodos(@PathVariable String username,@PathVariable int id){
//		ts.deleteById(id); 
		tr.deleteById(id);
		return ResponseEntity.noContent().build(); 
	}
	@PutMapping("/user/{username}/todo/{id}")
	public Todo updateTodos(@PathVariable String username,@PathVariable int id,@RequestBody Todo todo){
//		ts.updateTodo(todo);   
		tr.save(todo);
		return todo; 
	} 
	@PostMapping("/user/{username}/todo")
	public Todo addTodos(@PathVariable String username,@RequestBody Todo todo){
		todo.setUsername(username);
		todo.setId(null);
		return  tr.save(todo);
//		ts.addTodo(username,todo.getDescription(),todo.getTargetDate(),todo.isDone()); 
//		return todo; 
	}
}
