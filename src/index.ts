// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details)
import { testHandlebars } from '../test/handlebars-test';
import test from '../test/testFunctions';
import CardRenderer from './Transformer/CardRenderer/CardRenderer';
import TemplateManager from './TemplateManager';

export { testHandlebars } from '../test/handlebars-test';
export { TemplateManager };
export { CardRenderer };
export { ClientType, TemplateType } from './Transformer/Core/TransformContract';
testHandlebars();
test();
