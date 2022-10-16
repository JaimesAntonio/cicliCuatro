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
Usuario,
Tiquete,
Vuelos,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioVuelosController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Vuelos through Tiquete',
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
    return this.usuarioRepository.vuelos(id).find(filter);
  }

  @post('/usuarios/{id}/vuelos', {
    responses: {
      '200': {
        description: 'create a Vuelos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vuelos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelos, {
            title: 'NewVuelosInUsuario',
            exclude: ['id'],
          }),
        },
      },
    }) vuelos: Omit<Vuelos, 'id'>,
  ): Promise<Vuelos> {
    return this.usuarioRepository.vuelos(id).create(vuelos);
  }

  @patch('/usuarios/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Usuario.Vuelos PATCH success count',
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
    return this.usuarioRepository.vuelos(id).patch(vuelos, where);
  }

  @del('/usuarios/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Usuario.Vuelos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vuelos)) where?: Where<Vuelos>,
  ): Promise<Count> {
    return this.usuarioRepository.vuelos(id).delete(where);
  }
}
