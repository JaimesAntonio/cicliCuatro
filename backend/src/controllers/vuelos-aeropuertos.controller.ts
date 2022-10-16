import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vuelos,
  Aeropuertos,
} from '../models';
import {VuelosRepository} from '../repositories';

export class VuelosAeropuertosController {
  constructor(
    @repository(VuelosRepository)
    public vuelosRepository: VuelosRepository,
  ) { }

  @get('/vuelos/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Aeropuertos belonging to Vuelos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aeropuertos)},
          },
        },
      },
    },
  })
  async getAeropuertos(
    @param.path.string('id') id: typeof Vuelos.prototype.id,
  ): Promise<Aeropuertos> {
    return this.vuelosRepository.aeropuertos(id);
  }
}
