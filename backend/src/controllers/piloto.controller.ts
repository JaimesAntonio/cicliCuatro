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
import {Pilotos} from '../models';
import {PilotosRepository} from '../repositories';

export class PilotoController {
  constructor(
    @repository(PilotosRepository)
    public pilotosRepository : PilotosRepository,
  ) {}

  @post('/pilotos')
  @response(200, {
    description: 'Pilotos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pilotos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pilotos, {
            title: 'NewPilotos',
            exclude: ['id'],
          }),
        },
      },
    })
    pilotos: Omit<Pilotos, 'id'>,
  ): Promise<Pilotos> {
    return this.pilotosRepository.create(pilotos);
  }

  @get('/pilotos/count')
  @response(200, {
    description: 'Pilotos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pilotos) where?: Where<Pilotos>,
  ): Promise<Count> {
    return this.pilotosRepository.count(where);
  }

  @get('/pilotos')
  @response(200, {
    description: 'Array of Pilotos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pilotos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pilotos) filter?: Filter<Pilotos>,
  ): Promise<Pilotos[]> {
    return this.pilotosRepository.find(filter);
  }

  @patch('/pilotos')
  @response(200, {
    description: 'Pilotos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pilotos, {partial: true}),
        },
      },
    })
    pilotos: Pilotos,
    @param.where(Pilotos) where?: Where<Pilotos>,
  ): Promise<Count> {
    return this.pilotosRepository.updateAll(pilotos, where);
  }

  @get('/pilotos/{id}')
  @response(200, {
    description: 'Pilotos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pilotos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pilotos, {exclude: 'where'}) filter?: FilterExcludingWhere<Pilotos>
  ): Promise<Pilotos> {
    return this.pilotosRepository.findById(id, filter);
  }

  @patch('/pilotos/{id}')
  @response(204, {
    description: 'Pilotos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pilotos, {partial: true}),
        },
      },
    })
    pilotos: Pilotos,
  ): Promise<void> {
    await this.pilotosRepository.updateById(id, pilotos);
  }

  @put('/pilotos/{id}')
  @response(204, {
    description: 'Pilotos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pilotos: Pilotos,
  ): Promise<void> {
    await this.pilotosRepository.replaceById(id, pilotos);
  }

  @del('/pilotos/{id}')
  @response(204, {
    description: 'Pilotos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pilotosRepository.deleteById(id);
  }
}
