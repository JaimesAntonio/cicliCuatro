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
  Pilotos,
  Vuelos,
} from '../models';
import {PilotosRepository} from '../repositories';

export class PilotosVuelosController {
  constructor(
    @repository(PilotosRepository) protected pilotosRepository: PilotosRepository,
  ) { }

  @get('/pilotos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Array of Pilotos has many Vuelos',
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
    return this.pilotosRepository.vuelos(id).find(filter);
  }

  @post('/pilotos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Pilotos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vuelos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pilotos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelos, {
            title: 'NewVuelosInPilotos',
            exclude: ['id'],
            optional: ['pilotosId']
          }),
        },
      },
    }) vuelos: Omit<Vuelos, 'id'>,
  ): Promise<Vuelos> {
    return this.pilotosRepository.vuelos(id).create(vuelos);
  }

  @patch('/pilotos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Pilotos.Vuelos PATCH success count',
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
    return this.pilotosRepository.vuelos(id).patch(vuelos, where);
  }

  @del('/pilotos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Pilotos.Vuelos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vuelos)) where?: Where<Vuelos>,
  ): Promise<Count> {
    return this.pilotosRepository.vuelos(id).delete(where);
  }
}
