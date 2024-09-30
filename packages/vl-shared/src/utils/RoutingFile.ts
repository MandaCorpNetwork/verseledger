import { type IDestination, type IMission } from "schemas/RoutesSchema";

type IRoutingFile = {
  missions: IMission[],
  destinations: IDestination[]
}

export class RoutingFile implements IRoutingFile {
  public missions: IMission[]
  public destinations: IDestination[]
  constructor(data: IRoutingFile){

  }
  static parse(file: string): RoutingFile {
    return new RoutingFile()
  }
  toJSON(): IRoutingFile {
    return {missions: this.missions, destinations: this.destinations};
  }
  toString() {
  }
}