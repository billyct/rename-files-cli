#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const renameFiles = require('rename-files-b');

const cli = meow(`
	Usage
	  $ rename-files <pattern> <replace>

	Options
	  --path=<path>  the path has files that should rename

	Example
	  $ ls
	  ├── 1.jpg
      └── 2.png
	  $ rename-files (\\w+).(jpg|png) \$1_001.\$2 --path=./
	  ["1_001.jpg", "2_001.jpg"]
	  
`);

if (cli.input.length < 2) {
	console.error('please specify a pattern and a replace');
	process.exit(1);
}

if (Object.keys(cli.flags).length === 0 && cli.flags.constructor === Object) {
	// 默认参数
	cli.flags = {path: './'};
}

const result = renameFiles.sync(cli.input[0], cli.input[1], cli.flags);

if (result) {
	console.log(fs.readdirSync(cli.flags.path));
	process.exit();
} else {
	process.exit(1);
}
