import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Delivery} from '../models';
import {DeliveryRepository} from '../repositories';

export class DeliveryController {
  constructor(
    @repository(DeliveryRepository)
    public deliveryRepository : DeliveryRepository,
  ) {}

  @post('/deliveries')
  @response(200, {
    description: 'Delivery model instance',
    content: {'application/json': {schema: getModelSchemaRef(Delivery)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Delivery, {
            title: 'NewDelivery',
            exclude: ['id'],
          }),
        },
      },
    })
    delivery: Omit<Delivery, 'id'>,
  ): Promise<Delivery> {
    return this.deliveryRepository.create(delivery);
  }

  @get('/deliveries/count')
  @response(200, {
    description: 'Delivery model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Delivery) where?: Where<Delivery>,
  ): Promise<Count> {
    return this.deliveryRepository.count(where);
  }

  @get('/deliveries')
  @response(200, {
    description: 'Array of Delivery model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Delivery, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Delivery) filter?: Filter<Delivery>,
  ): Promise<Delivery[]> {
    return this.deliveryRepository.find(filter);
  }

  @patch('/deliveries')
  @response(200, {
    description: 'Delivery PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Delivery, {partial: true}),
        },
      },
    })
    delivery: Delivery,
    @param.where(Delivery) where?: Where<Delivery>,
  ): Promise<Count> {
    return this.deliveryRepository.updateAll(delivery, where);
  }

  @get('/deliveries/{id}')
  @response(200, {
    description: 'Delivery model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Delivery, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Delivery, {exclude: 'where'}) filter?: FilterExcludingWhere<Delivery>
  ): Promise<Delivery> {
    return this.deliveryRepository.findById(id, filter);
  }

  @patch('/deliveries/{id}')
  @response(204, {
    description: 'Delivery PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Delivery, {partial: true}),
        },
      },
    })
    delivery: Delivery,
  ): Promise<void> {
    await this.deliveryRepository.updateById(id, delivery);
  }

  @put('/deliveries/{id}')
  @response(204, {
    description: 'Delivery PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() delivery: Delivery,
  ): Promise<void> {
    await this.deliveryRepository.replaceById(id, delivery);
  }

  @del('/deliveries/{id}')
  @response(204, {
    description: 'Delivery DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deliveryRepository.deleteById(id);
  }
}
