import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Lista, ListaRelations} from '../models';

export class ListaRepository extends DefaultCrudRepository<
  Lista,
  typeof Lista.prototype.id,
  ListaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Lista, dataSource);
  }
}
