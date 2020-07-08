const shell = require('shelljs');

shell.mkdir("-p","lib/CardTemplate");
shell.mkdir("-p","lib/EventTemplate");
shell.cp("-R", "src/CardTemplate", "lib/CardTemplate");
shell.cp("-R", "src/EventTemplate", "lib/EventTemplate");
shell.cp("-R", "src/TransformerConfig.json", "lib/TransformerConfig.json");

