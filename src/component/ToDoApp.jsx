import React, { useEffect, useState } from "react";
import { InputArea } from "./InputArea";
import { ListItem } from "./ListItem";
import { ListGroup } from "react-bootstrap";

const ToDoApp = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/denis9diaz', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				return resp.json();
			})
			.then(data => {
				console.log(data);
				return setTodos(data)
			})
			.catch(error => {
				console.log(error);
			});
	}, [])

	const addTask = () => {
		if (!input) return;
		const newTodos = [{'id': Date.now(), 'label': input, 'done': false }, ...todos];
		setTodos(newTodos);
		setInput('');

		fetch('https://playground.4geeks.com/apis/fake/todos/user/denis9diaz', {
			method: 'PUT',
			body: JSON.stringify(todos),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(resp => resp.json())
			.then(data => setTodos(data))
			.catch(error => console.log(error));
	};

	const deleteTask = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		fetch('https://playground.4geeks.com/apis/fake/todos/user/denis9diaz', {
			method: 'PUT',
			body: JSON.stringify(todos),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(resp => resp.json())
			.then(data => setTodos(data))
			.catch(error => console.log(error));
	};

	return (
		<div className="container d-flex flex-column justify-content-center align-items-center">
			<div className="col-sm-12 col-md-8 col-lg-6">
				<h1 className="text-center mt-5">ToDo App</h1>
				<InputArea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onClick={addTask}
				/>
				<ListGroup>
					{todos.map((todo) => (
						<ListItem
							key={todo.id}
							toDoItem={todo.label}
							onClick={() => deleteTask(todo.id)}
						/>
					))}
				</ListGroup>

				<ListItem toDoItems={todos} onClick={() => deleteTask(id)} />
			</div>

			<p className="mt-4">
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p>
		</div>
	);
};

export default ToDoApp;
