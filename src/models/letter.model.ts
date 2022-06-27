import {model, property} from '@loopback/repository';
import {Deliverable} from '.';

@model()
export class Letter extends Deliverable {

  constructor(data?: Partial<Letter>) {
    super(data);
  }
}

export interface LetterRelations {
  // describe navigational properties here
}

export type LetterWithRelations = Letter & LetterRelations;
