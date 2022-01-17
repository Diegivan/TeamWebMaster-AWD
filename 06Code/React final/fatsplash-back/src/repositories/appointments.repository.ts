import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Appointments, AppointmentsRelations} from '../models';

export class AppointmentsRepository extends DefaultCrudRepository<
  Appointments,
  typeof Appointments.prototype.id,
  AppointmentsRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Appointments, dataSource);
  }
}
