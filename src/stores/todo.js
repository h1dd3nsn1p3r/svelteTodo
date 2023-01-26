
import { writable } from 'svelte/store';

/**
*
* Stores all todos once we fetch them from json server.
* @type {writable<Array<Todo>>}
*/

export const todosList = writable([]);

/**
*
* Fetches the todo list from the server
* @returns {Promise} - A promise that resolves to the todo list
*/

const fetchTodos = async () => {


}


/**
*
* Add to do item to the todo list
* @param {Todo} todo - The todo item to add
* @returns {Promise} - A promise.
*/

const addTodoHandler = async (todo) => {

}

/**
*
* Remove a todo item from the todo list
* @param {id} ID
* @returns {Promise} - A promise.
*/

const removeTodoHandler = async (id) => {

}

/**
*
* Update a todo item in the todo list
* @param {Todo} todo - The todo item to update
* @returns {Promise} - A promise.
*/

const updateTodoHandler = async (todo) => {

}

/**
*
* Update status of a todo item in the todo list.
* @param {id} id
* @returns {Promise} - A promise.
*/

const updateTodoStatus = async (id) => {

}
