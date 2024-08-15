export class Identifier {
  private _id: string;
  constructor(value: string) {
    this._id = value;
  }

  public toString() {
    return String(this._id);
  }

  public equals(id?: Identifier): boolean {
    if (id == null) return false;
    if (!(id instanceof this.constructor)) return false;
    return id.id === this.id;
  }

  get id(): string {
    return this._id;
  }
}
