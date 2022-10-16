import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Aeropuertos,
  Vuelos,
} from '../models';
import {AeropuertosRepository} from '../repositories';

export class AeropuertosVuelosController {
  constructor(
    @repository(AeropuertosRepository) protected aeropuertosRepository: AeropuertosRepository,
  ) { }

  @get('/aeropuertos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Array of Aeropuertos has many Vuelos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vuelos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vuelos>,
  ): Promise<Vuelos[]> {
    return this.aeropuertosRepository.vuelos(id).find(filter);
  }

  @post('/aeropuertos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Aeropuertos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vuelos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aeropuertos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelos, {
            title: 'NewVuelosInAeropuertos',
            exclude: ['id'],
            optional: ['aeropuertosId']
          }),
        },
      },
    }) vuelos: Omit<Vuelos, 'id'>,
  ): Promise<Vuelos> {
    return this.aeropuertosRepository.vuelos(id).create(vuelos);
  }

  @patch('/aeropuertos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Aeropuertos.Vuelos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelos, {partial: true}),
        },
      },
    })
    vuelos: Partial<Vuelos>,
    @param.query.object('where', getWhereSchemaFor(Vuelos)) where?: Where<Vuelos>,
  ): Promise<Count> {
    return this.aeropuertosRepository.vuelos(id).patch(vuelos, where);
  }

  @del('/aeropuertos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Aeropuertos.Vuelos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vuelos)) where?: Where<Vuelos>,
  ): Promise<Count> {
    return this.aeropuertosRepository.vuelos(id).delete(where);
  }
}
