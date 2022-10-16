import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pilotos, PilotosRelations, Vuelos} from '../models';
import {VuelosRepository} from './vuelos.repository';

export class PilotosRepository extends DefaultCrudRepository<
  Pilotos,
  typeof Pilotos.prototype.id,
  PilotosRelations
> {

  public readonly vuelos: HasManyRepositoryFactory<Vuelos, typeof Pilotos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VuelosRepository') protected vuelosRepositoryGetter: Getter<VuelosRepository>,
  ) {
    super(Pilotos, dataSource);
    this.vuelos = this.createHasManyRepositoryFactoryFor('vuelos', vuelosRepositoryGetter,);
    this.registerInclusionResolver('vuelos', this.vuelos.inclusionResolver);
  }
}
