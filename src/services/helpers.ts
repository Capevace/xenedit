import { File, WidgetProject } from '@/models';
import cuid from 'cuid';


export function defaultDirectory(): { [key: string]: File } {
	return {
		'index.html': {
			path: 'index.html',
			type: 'html',
			content: '<div class="box">Hello, World!</div>',
			label: 'HTML',
			template: '<html>\n<head>\n\t<link rel="stylesheet" href="index.css" type="text/css" />\n</head>\n<body>\n\t{{CONTENT}}\n</body>\n<script src="index.js"></script>\n</html>'
		},
		'index.css': {
			path: 'index.css',
			type: 'css',
			content: '.box { background: #2D3748cc; display: inline-block; padding: 5px; border-radius: 10px; color: white; }',
			label: 'CSS',
			template: '/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:left}\n\nbody{font-family: serif;}{{CONTENT}}'
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