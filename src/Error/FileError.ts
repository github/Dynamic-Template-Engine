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
