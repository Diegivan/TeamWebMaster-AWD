import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Clients, ClientsRelations} from '../models';

export class ClientsRepository extends DefaultCrudRepository<
  Clients,
  typeof Clients.prototype.id,
  ClientsRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Clients, dataSource);
  }
}
