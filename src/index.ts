import { testHandlebars } from './handlebars-test';
import { test } from './testFunctions';
// import TemplateEngineFactory from './Templating/TemplateEngineFactory';

// TemplateEngineFactory.initialize();

export {testHandlebars} from './handlebars-test';
export {CardRenderer} from './Transformer/CardRenderer/CardRenderer';
export {ClientType, SourceType, TemplateType} from './Transformer/TransformContracts'
testHandlebars();
test();