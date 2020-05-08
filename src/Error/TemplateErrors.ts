export class TemplateNotFound extends Error{
  constructor(message: string){
    super(message);
    this.name = TemplateNotFound.name;
  }
}

export class TemplateParseError extends Error{
  constructor(message: string){
    super(message);
    this.name = TemplateParseError.name;
  }
}

export class TemplateEngineNotFound extends Error{
  constructor(message: string){
    super(message);
    this.name = TemplateEngineNotFound.name;
  }
}

export class ErrorApplyingTemplate extends Error{
  constructor(message: string){
    super(message);
    this.name = ErrorApplyingTemplate.name;
  }
}