import React, { useEffect, useState } from "react";
import { InputArea } from "./InputArea";
import { ListItem } from "./ListItem";
import { Button, ListGroup } from "react-bootstrap";


const url = 'https://playground.4geeks.com/apis/fake/todos/user/reneruano95'

const ToDoApp = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		fetch(url, {
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
				data.length > 0
					? setTodos(data)
					: fetch(url, {
						method: 'POST',
						body: JSON.stringify(todos),
						headers: {
							'Content-Type': 'application/json',
						},
					})
						.then(resp => {
							console.log(resp.ok)
							console.log(resp.status)
							return resp.json()
						})
						.then(data => {
							console.log(data)
							return setTodos(data)
						})
						.catch(error => {
							console.log(error)
						})
			})
			.catch(error => {
				console.log(error);
			});
	}, [])

	const addTask = () => {
		if (!input) return;
		const newTodos = [{ 'done': false, 'id': Date.now(), 'label': input, }, ...todos];

		fetch(url, {
			method: 'PUT',
			body: JSON.stringify(newTodos),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(resp => {
				return resp.json()
			})
			.then(data => {

				setTodos(newTodos);
				setInput('');
				return console.log(data)
			})
			.catch(error => console.log(error));
	};

	const deleteTask = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		fetch(url, {
			method: 'PUT',
			body: JSON.stringify(newTodos),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(resp => {
				return resp.json()
			})
			.then(data => {

				setTodos(newTodos);
				return console.log(data)
			})
			.catch(error => console.log(error));
	};

	const cleanAllTasks = () => {
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data)
				setTodos([]);
			})
			.catch(error => console.log(error));
	};

	const remainingTasks = todos.length

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
				<div className="mt-3 d-flex justify-content-between">
					<p className="mt-2 ps-3">{remainingTasks} item{remainingTasks > 1 && 's'} left</p>
					<Button variant="outline-secondary" onClick={cleanAllTasks}>Clean all Tasks</Button>
				</div>

			</div>

			<p className="mt-4">
				Made by{" "}
				<a href="https://github.com/reneruano95">Rene Ruano</a>, with
				love!
			</p>
		</div>
	);
};

export default ToDoApp;
