import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Vuelos, Tiquete} from '../models';
import {TiqueteRepository} from './tiquete.repository';
import {VuelosRepository} from './vuelos.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly vuelos: HasManyThroughRepositoryFactory<Vuelos, typeof Vuelos.prototype.id,
          Tiquete,
          typeof Usuario.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TiqueteRepository') protected tiqueteRepositoryGetter: Getter<TiqueteRepository>, @repository.getter('VuelosRepository') protected vuelosRepositoryGetter: Getter<VuelosRepository>,
  ) {
    super(Usuario, dataSource);
    this.vuelos = this.createHasManyThroughRepositoryFactoryFor('vuelos', vuelosRepositoryGetter, tiqueteRepositoryGetter,);
    this.registerInclusionResolver('vuelos', this.vuelos.inclusionResolver);
  }
}
