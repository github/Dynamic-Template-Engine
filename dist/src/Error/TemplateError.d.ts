/** Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details) */
export declare class TemplateNotFound extends Error {
    constructor(message: string);
}
export declare class TemplateParseError extends Error {
    constructor(message: string);
}
export declare class TemplateEngineNotFound extends Error {
    constructor(message: string);
}
export declare class TemplateRenderError extends Error {
    constructor(message: string);
}
