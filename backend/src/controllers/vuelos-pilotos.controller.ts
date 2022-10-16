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
  Pilotos,
} from '../models';
import {VuelosRepository} from '../repositories';

export class VuelosPilotosController {
  constructor(
    @repository(VuelosRepository)
    public vuelosRepository: VuelosRepository,
  ) { }

  @get('/vuelos/{id}/pilotos', {
    responses: {
      '200': {
        description: 'Pilotos belonging to Vuelos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pilotos)},
          },
        },
      },
    },
  })
  async getPilotos(
    @param.path.string('id') id: typeof Vuelos.prototype.id,
  ): Promise<Pilotos> {
    return this.vuelosRepository.pilotos(id);
  }
}
