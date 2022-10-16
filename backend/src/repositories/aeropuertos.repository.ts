import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Aeropuertos, AeropuertosRelations, Vuelos, Rutas} from '../models';
import {VuelosRepository} from './vuelos.repository';
import {RutasRepository} from './rutas.repository';

export class AeropuertosRepository extends DefaultCrudRepository<
  Aeropuertos,
  typeof Aeropuertos.prototype.id,
  AeropuertosRelations
> {

  public readonly vuelos: HasManyRepositoryFactory<Vuelos, typeof Aeropuertos.prototype.id>;

  public readonly rutas: HasManyRepositoryFactory<Rutas, typeof Aeropuertos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VuelosRepository') protected vuelosRepositoryGetter: Getter<VuelosRepository>, @repository.getter('RutasRepository') protected rutasRepositoryGetter: Getter<RutasRepository>,
  ) {
    super(Aeropuertos, dataSource);
    this.rutas = this.createHasManyRepositoryFactoryFor('rutas', rutasRepositoryGetter,);
    this.registerInclusionResolver('rutas', this.rutas.inclusionResolver);
    this.vuelos = this.createHasManyRepositoryFactoryFor('vuelos', vuelosRepositoryGetter,);
    this.registerInclusionResolver('vuelos', this.vuelos.inclusionResolver);
  }
}
