import TemplateManager from './TemplateManager/TemplateManager';
import TemplateRegistrationHelper from './TemplateManager/TemplateRegisterartionHelper';

export function test(){
  const path = 'CardTemplates/TransformerConfig.json';
  //TemplateManager.setupTemplateConfiguration(path);
  TemplateManager.setupTemplateConfigurationFromRepo('anuraag016/TestTemplateEngine', 'master', 'TransformerConfig');
  //CardRenderer.printTemplateMap();
  setTimeout(()=>TemplateRegistrationHelper.printTemplateMap(), 5000);
}