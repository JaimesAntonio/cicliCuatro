import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vuelos, VuelosRelations, Pilotos, Aeropuertos} from '../models';
import {PilotosRepository} from './pilotos.repository';
import {AeropuertosRepository} from './aeropuertos.repository';

export class VuelosRepository extends DefaultCrudRepository<
  Vuelos,
  typeof Vuelos.prototype.id,
  VuelosRelations
> {

  public readonly pilotos: BelongsToAccessor<Pilotos, typeof Vuelos.prototype.id>;

  public readonly aeropuertos: BelongsToAccessor<Aeropuertos, typeof Vuelos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PilotosRepository') protected pilotosRepositoryGetter: Getter<PilotosRepository>, @repository.getter('AeropuertosRepository') protected aeropuertosRepositoryGetter: Getter<AeropuertosRepository>,
  ) {
    super(Vuelos, dataSource);
    this.aeropuertos = this.createBelongsToAccessorFor('aeropuertos', aeropuertosRepositoryGetter,);
    this.registerInclusionResolver('aeropuertos', this.aeropuertos.inclusionResolver);
    this.pilotos = this.createBelongsToAccessorFor('pilotos', pilotosRepositoryGetter,);
    this.registerInclusionResolver('pilotos', this.pilotos.inclusionResolver);
  }
}
