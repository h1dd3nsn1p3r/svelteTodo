<script>
	import { Button, Modal } from "flowbite-svelte";
	let title = "Editing"; // Default title.
	let text; // We will pass this text from the parent component.
</script>

<slot name="delete" />

<slot name="edit">
	<Modal {title} autoclose>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{text}
		</p>
		<svelte:fragment slot="footer">
			<Button>Update</Button>
			<Button color="alternative">Close</Button>
		</svelte:fragment>
	</Modal>
</slot>
