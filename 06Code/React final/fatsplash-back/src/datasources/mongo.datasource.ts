import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Mongo',
  connector: 'mongodb',
  url: 'mongodb+srv://admin:admin@clusteraws.6k7qv.mongodb.net/FastSplash?retryWrites=true&w=majority.',
  host: '',
  port: 27017,
  user: 'admin',
  password: 'admin',
  database: 'FatSplash',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
