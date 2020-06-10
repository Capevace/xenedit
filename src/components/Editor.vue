<template>
	<div class="relative flex flex-col">
		<nav class="bg-gray-200 px-3 py-2 text-gray-900 font-mono text-sm flex">
			<button
				v-for="(file, index) of filesDir"
				:key="file.id"
				@click="openFile(file)"
				class="flex-1 hover:bg-gray-300 border-gray-400"
				:class="{
					'rounded-r': index === filesDir.length - 1,
					'rounded-l': index === 0,
					'border-r': index !== filesDir.length - 1,
					'bg-gray-300': openedFile && openedFile.path === file.path
				}"
			>
				{{ file.label || file.name }}
			</button>
		</nav>
		<div ref="container" class="flex-1 relative"></div>
	</div>
</template>

<script lang="ts">
import { Component, Watch, BaseComponent } from '@/component';
import { File } from '@/models';
import { Action } from '@/store/actions';

import CodeFlask from 'codeflask';

@Component({})
export default class Preview extends BaseComponent {
	$refs!: {
		container: HTMLDivElement;
	};

	flask!: CodeFlask;

	get openedFile(): File | null {
		if (this.$store.state.openedFile) {
			return this.$store.state.project.files[
				this.$store.state.openedFile
			];
		}

		return null;
	}

	get filesDir(): File[] {
		return Object.values(this.$store.state.project.files);
	}

	mounted() {
		// This will setup Flask
		this.onOpenedFileChanged();
	}

	setupFlask(file: File) {
		this.flask = new CodeFlask(this.$refs.container, {
			language: file.type,
			lineNumbers: true
		});
		this.flask.updateCode(file.content);

		this.flask.onUpdate((code: string) => {
			if (!this.openedFile) return;

			this.$store.dispatch<Action>({
				type: 'saveFile',
				file: {
					...this.openedFile,
					content: code
				}
			});
		});
	}

	@Watch('$store.state.openedFile')
	onOpenedFileChanged() {
		if (this.openedFile) this.setupFlask(this.openedFile);
	}

	openFile(file: File) {
		console.log(file);
		this.$store.dispatch<Action>({
			type: 'openFile',
			path: file.path
		});
	}
}
</script>

<style></style>
