import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Rutas,
  Aeropuertos,
} from '../models';
import {RutasRepository} from '../repositories';

export class RutasAeropuertosController {
  constructor(
    @repository(RutasRepository)
    public rutasRepository: RutasRepository,
  ) { }

  @get('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Aeropuertos belonging to Rutas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aeropuertos)},
          },
        },
      },
    },
  })
  async getAeropuertos(
    @param.path.string('id') id: typeof Rutas.prototype.id,
  ): Promise<Aeropuertos> {
    return this.rutasRepository.aeropuertos(id);
  }
}
