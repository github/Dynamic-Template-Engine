import Transformer from '../Transformer';
import {ClientType, SourceType, TemplateType} from '../TransformContracts';
import TemplateRegistrationHelper from '../../TemplateManager/TemplateRegisterartionHelper';

// Card Renderer class exposes the ConstructCardJson
export class CardRenderer extends Transformer{
    // public static addTemplate(templateType: TemplateType, sourceType: SourceType, clientType: ClientType, templateId: string){
    //     const key = this.templateKey(templateType, sourceType, clientType);
    //     this.templateMap.set(key, templateId);
    // }

    public static templateKey = (templateType: TemplateType, sourceType: SourceType, clientType: ClientType): string => {
        return `${templateType}.${sourceType}.${clientType}`;
    };

    public ConstructCardJson(templateType: TemplateType, sourceType: SourceType, clientType: ClientType, eventJson: any): string {        
        // TODO: Validations for inputs -
        // sourceType, clientType and eventJson to be a valid json 
        const key = CardRenderer.templateKey(templateType, sourceType, clientType);        
        const templateId = TemplateRegistrationHelper.getTemplateId(key);
        return this.applyTemplate(templateType, templateId, eventJson);
    }

}
