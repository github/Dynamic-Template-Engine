/** Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details) */
export class TemplateNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = TemplateNotFound.name;
  }
}

export class TemplateParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = TemplateParseError.name;
  }
}

export class TemplateEngineNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = TemplateEngineNotFound.name;
  }
}

export class TemplateRenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = TemplateRenderError.name;
  }
}
