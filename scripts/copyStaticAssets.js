const shell = require('shelljs');

shell.cp("-R", "src/CardTemplate", "lib/src/CardTemplate");
shell.cp("-R", "src/EventTemplate", "lib/src/EventTemplate");
shell.cp("-R", "src/TransformerConfig.json", "lib/src/TransformerConfig.json");