import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Tiquete, TiqueteRelations} from '../models';

export class TiqueteRepository extends DefaultCrudRepository<
  Tiquete,
  typeof Tiquete.prototype.id,
  TiqueteRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Tiquete, dataSource);
  }
}
