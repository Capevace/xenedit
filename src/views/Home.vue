<template>
	<main class="flex flex-1">
		<Editor class="flex-1"></Editor>
		<Preview class="w-1/3 border-l"></Preview>
	</main>
</template>

<script>
// @ is an alias to /src
import Preview from '@/components/Preview.vue';
import Editor from '@/components/Editor.vue';

export default {
	name: 'Home',
	components: { Preview, Editor }
};
</script>

<style>
header {
	background: #8500ff;
}
</style>
