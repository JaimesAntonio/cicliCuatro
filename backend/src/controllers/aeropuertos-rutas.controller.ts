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
  Rutas,
} from '../models';
import {AeropuertosRepository} from '../repositories';

export class AeropuertosRutasController {
  constructor(
    @repository(AeropuertosRepository) protected aeropuertosRepository: AeropuertosRepository,
  ) { }

  @get('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Array of Aeropuertos has many Rutas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rutas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rutas>,
  ): Promise<Rutas[]> {
    return this.aeropuertosRepository.rutas(id).find(filter);
  }

  @post('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Aeropuertos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rutas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aeropuertos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rutas, {
            title: 'NewRutasInAeropuertos',
            exclude: ['id'],
            optional: ['aeropuertosId']
          }),
        },
      },
    }) rutas: Omit<Rutas, 'id'>,
  ): Promise<Rutas> {
    return this.aeropuertosRepository.rutas(id).create(rutas);
  }

  @patch('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Aeropuertos.Rutas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rutas, {partial: true}),
        },
      },
    })
    rutas: Partial<Rutas>,
    @param.query.object('where', getWhereSchemaFor(Rutas)) where?: Where<Rutas>,
  ): Promise<Count> {
    return this.aeropuertosRepository.rutas(id).patch(rutas, where);
  }

  @del('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Aeropuertos.Rutas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rutas)) where?: Where<Rutas>,
  ): Promise<Count> {
    return this.aeropuertosRepository.rutas(id).delete(where);
  }
}
