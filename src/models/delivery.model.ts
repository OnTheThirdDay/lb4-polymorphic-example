import {Entity, hasOne, model, property} from '@loopback/repository';
import {Deliverable} from './deliverable.model';

@model()
export class Delivery extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasOne(() => Deliverable, {polymorphic: true})
  deliverable: Deliverable;

  @property({
    type: 'string',
    required: true,
    default: 'Letter',
  })
  deliverableType: string;

  constructor(data?: Partial<Delivery>) {
    super(data);
  }
}

export interface DeliveryRelations {
  // describe navigational properties here
}

export type DeliveryWithRelations = Delivery & DeliveryRelations;
