import { File, WidgetProject } from '@/models';
import cuid from 'cuid';


export function defaultDirectory(): { [key: string]: File } {
	return {
		'index.html': {
			path: 'index.html',
			type: 'html',
			content: '<div class="box">Hello, World!</div>',
			label: 'HTML'
		},
		'index.css': {
			path: 'index.css',
			type: 'css',
			content: '.box { background: #2D3748cc; display: inline-block; padding: 5px; border-radius: 10px; color: white; }',
			label: 'CSS'
		},
		'index.js': {
			path: 'index.js',
			type: 'js',
			content: 'console.log();',
			label: 'JavaScript'
		}
	};
}

export function defaultProject(): WidgetProject {
	return {
		meta: {
			id: cuid(),
			name: 'Untitled Widget',
			version: '0.0.1',
			author: '',
			description: '',
			position: { x: 0, y: 0 }
		},
		files: defaultDirectory()
	};
}