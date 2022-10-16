import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rutas, RutasRelations, Aeropuertos} from '../models';
import {AeropuertosRepository} from './aeropuertos.repository';

export class RutasRepository extends DefaultCrudRepository<
  Rutas,
  typeof Rutas.prototype.id,
  RutasRelations
> {

  public readonly aeropuertos: BelongsToAccessor<Aeropuertos, typeof Rutas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AeropuertosRepository') protected aeropuertosRepositoryGetter: Getter<AeropuertosRepository>,
  ) {
    super(Rutas, dataSource);
    this.aeropuertos = this.createBelongsToAccessorFor('aeropuertos', aeropuertosRepositoryGetter,);
    this.registerInclusionResolver('aeropuertos', this.aeropuertos.inclusionResolver);
  }
}
