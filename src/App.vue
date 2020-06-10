<template>
	<article class="min-h-screen flex flex-col">
		<header class="w-full py-2 px-5 flex justify-between text-white">
			<router-link to="/">
				<h1 class="text-2xl font-medium">
					Xen<strong class="font-bold">Edit</strong>
				</h1>
			</router-link>
			<nav class="flex justify-end items-center flex-1">
				<router-link
					to="/"
					active-class="bg-purple-500"
					exact
					class="block mr-5 font-semibold px-2 py-1 rounded-lg"
				>
					Editor
				</router-link>

				<router-link
					to="import"
					active-class="bg-purple-500"
					class="block mr-5 font-semibold px-2 py-1 rounded-lg"
				>
					Import
				</router-link>
				<router-link
					to="export"
					active-class="bg-purple-500"
					class="block font-semibold px-2 py-1 rounded-lg"
				>
					Export
				</router-link>
			</nav>
		</header>

		<router-view class="flex-1" />

		<footer
			class="flex justify-center items-center py-2 px-5 bg-gray-200 text-gray-600 text-sm"
		>
			<a href="https://twitter.com/capevace">
				Made with 💜 by <strong>@capevace</strong>
			</a>
			<span class="mx-2">|</span>
			<a href="https://github.com/capevace/xenedit">
				Source Code
			</a>
		</footer>
	</article>
</template>

<style lang="scss">
@import 'tailwindcss/base';

@import 'tailwindcss/components';

@import 'tailwindcss/utilities';
</style>
