const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'action', alias: 'a', type: String },
  { name: 'file', alias: 'f', type: String }
];

const actions = {
	reverse(str) {
		process.stdin.on('readable', () => {
		  const chunk = process.stdin.read();
		  if (chunk !== null) {
		    process.stdout.write(str.split('').reverse().join(''));
		  }
		});
		process.stdin.end()

	},
	transform(str) {  },
	outputFile(filePath) {  },
	convertFromFile(filePath) {  },
	convertToFile(filePath) {  },
	help() {
		console.log('help')
	}


}

try {
	const options = commandLineArgs(optionDefinitions);
	console.log(options);
	actions[options.action](options.file);

} catch(e) {
	actions.help()
}



