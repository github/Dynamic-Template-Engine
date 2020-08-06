// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/dynamic-template-engine/blob/master/LICENSE) for details)
export class FunctionalityNotSupportedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = FunctionalityNotSupportedError.name;
  }
}

export class CustomHelperRegisterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = CustomHelperRegisterError.name;
  }
}

export class CustomTagRegisterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = CustomTagRegisterError.name;
  }
}
