<template>
	<div class="flex flex-col">
		<nav
			class="bg-gray-200 px-3 py-2 text-gray-900 text-sm flex justify-between"
		>
			<h2 class="font-bold">
				Preview
			</h2>
			<div class="font-mono">
				<button
					class="bg-gray-400 rounded px-2 mr-4"
					@click="positionLocked = !positionLocked"
				>
					{{ positionLocked ? 'Unlock' : 'Lock' }} Widget Position
					{{ positionLocked ? '🔒' : '🔓' }}
				</button>
				<button class="bg-gray-400 rounded px-2">Change BG</button>
			</div>
		</nav>
		<div
			class="relative h-full overflow-hidden"
			ref="container"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp"
			@mousemove="onMouseMove"
		>
			<div
				class="absolute bg-contain overflow-hidden m-auto min-height-0"
				:style="bgStyle"
			>
				<div
					class="absolute bg-contain canvas"
					:class="{
						'bg-gray-600 opacity-75 border-4 border-dotted border-gray-900 box-border': !positionLocked
					}"
					:style="canvasStyle"
					ref="canvas"
				></div>
			</div>

			<resize-observer @notify="onResize" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Watch, BaseComponent } from '@/component';
import { Point } from '../models';
import { Action } from '../store/actions';
import 'vue-resize/dist/vue-resize.css';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ResizeObserver } = require('vue-resize');

@Component({
	components: {
		ResizeObserver
	}
})
export default class Preview extends BaseComponent {
	$refs!: {
		container: HTMLDivElement;
		canvas: HTMLDivElement;
	};

	width = 0;
	height = 0;
	scale = 1;

	positionLocked = true;

	shadow!: ShadowRoot;

	drag: Point | null = null;
	dragStart: Point | null = null;

	mounted() {
		this.shadow = this.$refs.canvas.attachShadow({
			mode: 'closed'
		});

		this.calculateLayout();
	}

	calculateLayout() {
		this.width = this.$refs.container.clientHeight * 0.4625;
		this.height = this.$refs.container.clientHeight;

		this.scale = Math.min(
			this.height / this.size.height,
			this.$refs.container.clientWidth / this.size.width
		);

		this.shadow.innerHTML = this.htmlContent;
	}

	get baseUrl(): string {
		return process.env.BASE_URL || '/';
	}

	get size(): { width: number; height: number } {
		return { width: 370, height: 800 };
	}

	get dragString(): string {
		if (this.drag) return JSON.stringify(this.drag);
		else return 'none';
	}

	// beforeDestroy() {}

	get bgStyle(): object {
		return {
			left: '50%',
			top: '50%',
			marginLeft: `-${(this.size.width / 2) * this.scale}px`,
			marginTop: `-${(this.size.height / 2) * this.scale}px`,
			width: `${this.size.width}px`,
			height: `${this.size.height}px`,
			transform: `scale(${this.scale})`,
			transformOrigin: 'left top',
			backgroundImage: `url('${this.baseUrl}img/screens/lock1.jpg')`
			// width: `${this.width}px`,
			// height: `${this.height}px`
		};
	}

	get canvasStyle(): object {
		return {
			width: `${this.size.width}px`,
			height: `${this.size.height}px`,
			transform: `translate(${this.$store.state.project.meta.position.x +
				(this.drag?.x || 0) / this.scale}px, ${this.$store.state.project
				.meta.position.y +
				(this.drag?.y || 0) / this.scale}px)`
		};
	}

	get styleContent(): string {
		return (
			`<style>/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:left}</style>` +
			`<style>${this.$store.state.project.files['index.css'].content}</style>`
		);
	}

	get htmlContent(): string {
		return (
			this.styleContent +
			this.$store.state.project.files['index.html'].content
		);
	}

	@Watch('$store.state.project.files', { deep: true })
	onFilesChange() {
		this.shadow.innerHTML = this.htmlContent;
		this.$forceUpdate();
	}

	onResize() {
		this.calculateLayout();
	}

	onMouseDown(e: MouseEvent) {
		if (this.positionLocked) return;

		e.preventDefault();
		// this.dragStart = this.$store.state.position;

		this.dragStart = this.normalizeDragPosition({
			x: e.clientX,
			y: e.clientY
		});
		this.drag = { x: 0, y: 0 };
	}

	onMouseMove(e: MouseEvent) {
		if (!this.drag || !this.dragStart) return;

		e.preventDefault();

		const newDragPosition = this.normalizeDragPosition({
			x: e.clientX,
			y: e.clientY
		});

		this.drag = {
			x: newDragPosition.x - this.dragStart.x,
			y: newDragPosition.y - this.dragStart.y
		};
	}

	onMouseUp(e: Event) {
		if (!this.drag || !this.dragStart) return;

		e.preventDefault();

		this.$store.dispatch<Action>({
			type: 'movePosition',
			position: {
				x:
					this.$store.state.project.meta.position.x +
					this.drag.x / this.scale,
				y:
					this.$store.state.project.meta.position.y +
					this.drag.y / this.scale
			}
		});

		this.drag = null;
		this.dragStart = null;
	}

	normalizeDragPosition(position: Point): Point {
		return {
			x: position.x - this.$refs.container.offsetLeft,
			y: position.y - this.$refs.container.offsetTop
		};
	}
}
</script>

<style>
.canvas {
	font-family: serif;
}
</style>
