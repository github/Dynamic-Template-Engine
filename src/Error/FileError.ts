// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details)
export class EmptyFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = EmptyFileError.name;
  }
}

export class FileReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = FileReadError.name;
  }
}

export class FileParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = FileParseError.name;
  }
}
