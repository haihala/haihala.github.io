import fs from 'fs';
import path from 'path';

const postsFolder = 'src/lib/posts';

function getPostList(): string[] {
	if (!fs.existsSync(postsFolder)) {
		return [];
	}

	return fs.readdirSync(postsFolder);
}

function updatePost(fname: string) {
	const fpath = path.join(postsFolder, fname);
	const lines = fs.readFileSync(fpath).toString().split('\n');

	// First line is always start of frontmatter, aka '---'
	console.assert(lines[0] === '---');

	let inFrontMatter = true;
	let wordCount = 0;

	const frontMatterLines: string[] = [];
	const bodyLines: string[] = [];
	for (const line of lines.slice(1)) {
		if (line === '---') {
			inFrontMatter = false;
			continue;
		}

		if (inFrontMatter) {
			if (!line.startsWith('wordCount')) {
				frontMatterLines.push(line);
			}
		} else {
			wordCount += line.split(' ').length;
			bodyLines.push(line);
		}
	}

	const output = [
		// Frontmatter
		'---',
		...frontMatterLines,
		// Word count is the last element
		`wordCount: ${wordCount}`,
		'---',
		// Body
		...bodyLines
	].join('\n');

	fs.writeFileSync(fpath, output);
}

function main() {
	for (const post of getPostList()) {
		updatePost(post);
	}
}

main();
