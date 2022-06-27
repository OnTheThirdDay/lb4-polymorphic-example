import {Entity, model, property} from '@loopback/repository';

@model()
export class Deliverable extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  deliveryId?: string;

  constructor(data?: Partial<Deliverable>) {
    super(data);
  }
}

export interface DeliverableRelations {
  // describe navigational properties here
}

export type DeliverableWithRelations = Deliverable & DeliverableRelations;
