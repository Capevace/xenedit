<template>
	<main class="container mx-auto mt-5 py-2 px-5">
		<form action="" class="w-full mb-10">
			<nav class="flex justify-between  mb-5">
				<h2 class="text-2xl font-medium text-gray-900">
					Import Widget
				</h2>

				<button
					class="bg-purple-500 text-white rounded shadow px-3 py-1 font-medium export-button"
					@click.prevent="importWidget"
				>
					Import file
				</button>
			</nav>
			<section class="flex">
				<input type="file" ref="files" class="input" />
			</section>
		</form>
	</main>
</template>

<script lang="ts">
import { Component, Watch, BaseComponent } from '@/component';
import { Action } from '@/store/actions';
import { zipToProject } from '@/services/zip';

@Component({})
export default class Import extends BaseComponent {
	$refs!: {
		files: HTMLInputElement;
	};

	async importWidget() {
		if (this.$refs.files.files && this.$refs.files.files[0]) {
			const file = this.$refs.files.files[0];
			const reader = new FileReader();
			reader.addEventListener('load', async (event: any) => {
				const blob = event.target.result;
				const project = await zipToProject(blob);

				this.$store.dispatch<Action>({
					type: 'importProject',
					project: project
				});

				alert(`Sucessfully imported "${project.meta.name}"`);
				this.$router.push('/');
			});
			reader.readAsArrayBuffer(file);
		}
	}
}
</script>

<style lang="postcss">
.input {
	@apply bg-gray-200 rounded border text-lg px-3 py-1 text-gray-800;
}

.export-button {
	background: #8500ff;
}
</style>
