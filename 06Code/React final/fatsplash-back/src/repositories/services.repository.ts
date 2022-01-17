import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Services, ServicesRelations} from '../models';

export class ServicesRepository extends DefaultCrudRepository<
  Services,
  typeof Services.prototype.id,
  ServicesRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Services, dataSource);
  }
}
