import fs from 'fs';
import path from 'path';
import test from 'ava';
import execa from 'execa';
import tempfile from 'tempfile';

const numbertest = 10;

test.beforeEach(async t => {
	const tmpDir = tempfile();
	fs.mkdirSync(tmpDir);
	t.context.tmpDir = tmpDir;
	t.context.tmpFiles = [];

	for (let i = numbertest; i >= 0; i--) {
		const filepath = path.resolve(tmpDir, `${i}.txt`);
		t.context.tmpFiles.push(filepath);
		fs.writeFileSync(filepath, i);
	}
});

test.afterEach(t => {
	t.context.tmpFiles.forEach(file => {
		fs.unlinkSync(file);
	});
	fs.rmdirSync(t.context.tmpDir);
});

test(async t => {
	/* eslint no-useless-escape: 0 */
	// 字符串的时候使用\$，在命令行里面使用\\$
	await execa.stdout('./cli.js', ['(\\w+).(txt)', '$1_001.$2', '--path=' + t.context.tmpDir]);
	const filesShouldBe = [
		'0_001.txt',
		'10_001.txt',
		'1_001.txt',
		'2_001.txt',
		'3_001.txt',
		'4_001.txt',
		'5_001.txt',
		'6_001.txt',
		'7_001.txt',
		'8_001.txt',
		'9_001.txt'
	];
	const filesAfter = fs.readdirSync(t.context.tmpDir);
	t.context.tmpFiles = filesAfter.map(file => path.resolve(t.context.tmpDir, file));
	t.deepEqual(filesAfter, filesShouldBe);
});
