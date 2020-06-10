<template>
	<main class="container mx-auto mt-5 py-2 px-5">
		<form action="" class="w-full mb-10">
			<nav class="flex justify-between  mb-5">
				<h2 class="text-2xl font-medium text-gray-900">
					Export Widget
				</h2>

				<button
					class="bg-purple-500 text-white rounded shadow px-3 py-1 font-medium export-button"
					@click.prevent="exportWidget"
				>
					Export as ZIP-file
				</button>
			</nav>
			<section class="flex">
				<div class="flex-1">
					<label
						for=""
						class="text-sm flex flex-col font-medium text-gray-600 mb-4"
					>
						Name
						<input type="text" class="input" v-model="name" />
					</label>

					<label
						for=""
						class="text-sm flex flex-col font-medium text-gray-600"
					>
						Author
						<input type="text" class="input" v-model="author" />
					</label>
				</div>
				<div class="w-20"></div>
				<div class="flex-1">
					<label
						for=""
						class="text-sm flex flex-col font-medium text-gray-600 mb-4"
					>
						Version
						<input type="text" class="input" v-model="version" />
					</label>

					<label
						for=""
						class="text-sm flex flex-col font-medium text-gray-600"
					>
						Description
						<textarea
							type="text"
							class="input"
							v-model="description"
						/>
					</label>
				</div>
			</section>
		</form>
	</main>
</template>

<script lang="ts">
import { Component, Watch, BaseComponent } from '@/component';
import { projectToZip } from '@/services/zip';
import { Commit } from '@/store/actions';

@Component({})
export default class Export extends BaseComponent {
	async exportWidget() {
		const zip = await projectToZip(this.$store.state.project);

		const a = document.createElement('a');
		document.body.appendChild(a);
		a.download = `${this.$store.state.project.meta.name}.zip`;
		a.href = URL.createObjectURL(zip);
		a.click();

		a.remove();
	}

	get name(): string {
		return this.$store.state.project.meta.name;
	}

	set name(value: string) {
		this.$store.commit<Commit>({
			type: 'updateProject',
			project: {
				meta: {
					...this.$store.state.project.meta,
					name: value
				}
			}
		});
	}

	get version(): string {
		return this.$store.state.project.meta.version;
	}

	set version(value: string) {
		this.$store.commit<Commit>({
			type: 'updateProject',
			project: {
				meta: {
					...this.$store.state.project.meta,
					version: value
				}
			}
		});
	}

	get author(): string {
		return this.$store.state.project.meta.author;
	}

	set author(value: string) {
		this.$store.commit<Commit>({
			type: 'updateProject',
			project: {
				meta: {
					...this.$store.state.project.meta,
					author: value
				}
			}
		});
	}

	get description(): string {
		return this.$store.state.project.meta.description;
	}

	set description(value: string) {
		this.$store.commit<Commit>({
			type: 'updateProject',
			project: {
				meta: {
					...this.$store.state.project.meta,
					description: value
				}
			}
		});
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
