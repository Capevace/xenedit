import JSZip from 'jszip';
import { WidgetProject, File } from '@/models';
import { defaultProject } from './helpers';

function renderFile(file: File): string {
	return file.template ? file.template.replace(/\{\{CONTENT\}\}/, file.content) : file.content;
}

export async function projectToZip(project: WidgetProject): Promise<Blob> {
	const zip = new JSZip();

	for (const file of Object.values(project.files)) {
		const output = renderFile(file);
		console.log(output);

		zip.file(file.path, output);
	}

	zip.file('xenedit.json', JSON.stringify(project.meta, null, 2));

	return await zip.generateAsync({ type: 'blob' });
}

export async function configFromZip(zip: JSZip): Promise<WidgetProject['meta']> {
	let config: WidgetProject['meta'];
	try {
		const rawConfig = await zip.file('xenedit.json').async('text');
		return JSON.parse(rawConfig);
	} catch (e) {
		return defaultProject().meta;
	}
}

export async function zipToProject(blob: Blob): Promise<WidgetProject> {
	const zip = new JSZip();
	const loadedZip = await zip.loadAsync(blob);

	return {
		meta: await configFromZip(loadedZip),
		files: {
			'index.html': {
				path: 'index.html',
				type: 'html',
				content: await loadedZip.file('index.html').async('text'),
				label: 'HTML'
			},
			'index.css': {
				path: 'index.css',
				type: 'css',
				content: await loadedZip.file('index.css').async('text'),
				label: 'CSS'
			},
			'index.js': {
				path: 'index.js',
				type: 'js',
				content: await loadedZip.file('index.js').async('text'),
				label: 'JavaScript'
			}
		}
	}
}