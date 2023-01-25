<script>
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import { Input, Toast, Button, Spinner, Badge } from "flowbite-svelte";

	/**
	 * Json server url
	 */

	const db = "http://localhost:3004/todos";

	/**
	 * Mutate this array to update the list of todos.
	 * @type {Array} todos
	 */
	let todoList = [];

	/**
	 * For store todo input values.
	 * @type {Object} todo
	 */
	let todo = {
		title: "",
		status: "Pending",
	};

	/**
	 * For storing status of the request.
	 * @type {Object} status
	 */
	let status = {
		isInserting: false,
		success: false,
		todosFetched: false,
	};

	/**
	 * Get all todos.
	 *
	 */

	const getAllTodos = async () => {
		try {
			const res = await fetch(db);
			const data = await res.json();
			todoList = data;
			status.todosFetched = true;
			getAllTodos(); // Update this list once a new todo is added.
		} catch (err) {
			console.error(err);
			status.todosFetched = false;
		}
	};

	/**
	 * Add a new todo.
	 *
	 */
	const addTodoHandler = async () => {
		status.isInserting = true;
		try {
			const res = await fetch(db, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(todo),
			});

			if (res.status === 201) {
				status.success = true;
				status.isInserting = false;
				todo.title = ""; // Clear input field.
			}
		} catch (err) {
			console.error(err);
			status.isInserting = false;
		}
	};

	/**
	 * On mount lifecycle hook.
	 * Get all todos.
	 * @returns {void}
	 */
	onMount(() => {
		getAllTodos();
	});
</script>

<form on:submit|preventDefault>
	<div id="add-todo">
		<div class="app-grid">
			<div>
				<Input
					type="text"
					size="lg"
					id="todo_title"
					placeholder="ie. Visit dental clinic"
					required
					bind:value={todo.title}
				/>
			</div>

			<div>
				<Button size="xl" on:click={addTodoHandler}>
					{#if status.isInserting}
						<Spinner class="mr-3" size="4" />
					{/if}
					Add todo
				</Button>
			</div>
		</div>
	</div>
	<div id="list-todos">
		<h2>All todos:</h2>
		<div class="all-todos">
			<ul>
				{#each todoList as todo}
					<li>
						<div class="id">{todo.id}</div>
						<div class="title">
							{todo.title}
							<Badge
								rounded
								color={todo.status === "Completed"
									? "green"
									: "purple"}
							>
								{todo.status}
							</Badge>
						</div>
						<div class="actions">
							<Button size="xs" color="light">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path
										d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
									/>
									<path
										fill-rule="evenodd"
										d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
									/>
								</svg>
							</Button>
							<Button size="xs" color="red">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path
										d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
									/>
								</svg>
							</Button>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</form>

{#if status.success}
	<Toast position="top-right" transition={slide}>
		<svelte:fragment slot="icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
				/><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
				/>
			</svg>
		</svelte:fragment>
		Todo added successfully.
	</Toast>
{/if}