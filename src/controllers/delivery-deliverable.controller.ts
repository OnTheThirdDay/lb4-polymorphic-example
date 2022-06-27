import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, HttpErrors, param, post,
  requestBody
} from '@loopback/rest';
import {
  Deliverable, Delivery, Letter, Parcel
} from '../models';
import {DeliveryRepository} from '../repositories';

export class DeliveryDeliverableController {
  constructor(
    @repository(DeliveryRepository) protected deliveryRepository: DeliveryRepository,
  ) { }

  @get('/deliveries/{id}/deliverable', {
    responses: {
      '200': {
        description: 'Delivery has one Deliverable',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Deliverable),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Deliverable>,
  ): Promise<Deliverable> {
    return this.deliveryRepository.deliverable(id).get(filter);
  }

  @post('/deliveries/{id}/letter', {
    responses: {
      '200': {
        description: 'Delivery model instance',
        content: {'application/json': {schema: getModelSchemaRef(Letter)}},
      },
    },
  })
  async createLetter(
    @param.path.string('id') id: typeof Delivery.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Letter, {
            title: 'NewLetterInDelivery',
            exclude: ['id'],
            optional: ['deliveryId']
          }),
        },
      },
    }) letter: Omit<Letter, 'id'>,
  ): Promise<Deliverable> {
    if ((await this.deliveryRepository.findById(id)).deliverableType != "Letter") {
      throw new HttpErrors.BadRequest("The deliverable type of the delivery must be a letter");
    }
    return this.deliveryRepository.deliverable(id).create(letter, {polymorphicType: "Letter"});
  }

  @post('/deliveries/{id}/parcel', {
    responses: {
      '200': {
        description: 'Delivery model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parcel)}},
      },
    },
  })
  async createParcel(
    @param.path.string('id') id: typeof Delivery.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parcel, {
            title: 'NewParcelInDelivery',
            exclude: ['id'],
            optional: ['deliveryId']
          }),
        },
      },
    }) parcel: Omit<Parcel, 'id'>,
  ): Promise<Parcel> {
    if ((await this.deliveryRepository.findById(id)).deliverableType != "Parcel") {
      throw new HttpErrors.BadRequest("The deliverable type of the delivery must be a parcel");
    }
    return this.deliveryRepository.deliverable(id).create(parcel, {polymorphicType: "Parcel"});
  }
}
