import {model, property} from '@loopback/repository';
import {Deliverable} from '.';

@model()
export class Parcel extends Deliverable {

  constructor(data?: Partial<Parcel>) {
    super(data);
  }
}

export interface ParcelRelations {
  // describe navigational properties here
}

export type ParcelWithRelations = Parcel & ParcelRelations;
