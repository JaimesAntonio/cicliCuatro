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
import {Tiquete} from '../models';
import {TiqueteRepository} from '../repositories';

export class TiqueteController {
  constructor(
    @repository(TiqueteRepository)
    public tiqueteRepository : TiqueteRepository,
  ) {}

  @post('/tiquetes')
  @response(200, {
    description: 'Tiquete model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tiquete)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiquete, {
            title: 'NewTiquete',
            exclude: ['id'],
          }),
        },
      },
    })
    tiquete: Omit<Tiquete, 'id'>,
  ): Promise<Tiquete> {
    return this.tiqueteRepository.create(tiquete);
  }

  @get('/tiquetes/count')
  @response(200, {
    description: 'Tiquete model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tiquete) where?: Where<Tiquete>,
  ): Promise<Count> {
    return this.tiqueteRepository.count(where);
  }

  @get('/tiquetes')
  @response(200, {
    description: 'Array of Tiquete model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tiquete, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tiquete) filter?: Filter<Tiquete>,
  ): Promise<Tiquete[]> {
    return this.tiqueteRepository.find(filter);
  }

  @patch('/tiquetes')
  @response(200, {
    description: 'Tiquete PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiquete, {partial: true}),
        },
      },
    })
    tiquete: Tiquete,
    @param.where(Tiquete) where?: Where<Tiquete>,
  ): Promise<Count> {
    return this.tiqueteRepository.updateAll(tiquete, where);
  }

  @get('/tiquetes/{id}')
  @response(200, {
    description: 'Tiquete model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tiquete, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tiquete, {exclude: 'where'}) filter?: FilterExcludingWhere<Tiquete>
  ): Promise<Tiquete> {
    return this.tiqueteRepository.findById(id, filter);
  }

  @patch('/tiquetes/{id}')
  @response(204, {
    description: 'Tiquete PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiquete, {partial: true}),
        },
      },
    })
    tiquete: Tiquete,
  ): Promise<void> {
    await this.tiqueteRepository.updateById(id, tiquete);
  }

  @put('/tiquetes/{id}')
  @response(204, {
    description: 'Tiquete PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tiquete: Tiquete,
  ): Promise<void> {
    await this.tiqueteRepository.replaceById(id, tiquete);
  }

  @del('/tiquetes/{id}')
  @response(204, {
    description: 'Tiquete DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tiqueteRepository.deleteById(id);
  }
}
