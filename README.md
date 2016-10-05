# rename-files-cli
[![Build Status](https://travis-ci.org/billyct/rename-files-cli.svg?branch=master)](https://travis-ci.org/sindresorhus/rename-files-cli)
rename files with pattern like String.replace(pattern, replace)

## Install
```
$ npm install --global rename-files-cli
```

## Usage
```
$ rename-files --help

  Usage
	$ rename-files <pattern> <replace>

  Options
	--path=<path>  the path has files that should rename
```

## Example
```
  $ ls
  ├── 1.jpg
  └── 2.png
  $ rename-files (\\w+).(jpg|png) \$1_001.\$2 --path=./
  ["1_001.jpg", "2_001.jpg"]
```


## Related
- [rename-files](https://github.com/billyct/rename-files) - API for this module


## License
MIT © [billyct](http://billyct.com)