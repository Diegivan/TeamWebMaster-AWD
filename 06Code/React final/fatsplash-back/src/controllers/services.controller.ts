import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Services} from '../models';
import {ServicesRepository} from '../repositories';

export class ServicesController {
  constructor(
    @repository(ServicesRepository)
    public servicesRepository : ServicesRepository,
  ) {}

  @post('/services')
  @response(200, {
    description: 'Services model instance',
    content: {'application/json': {schema: getModelSchemaRef(Services)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Services, {
            title: 'NewServices',
            exclude: ['id'],
          }),
        },
      },
    })
    services: Omit<Services, 'id'>,
  ): Promise<Services> {
    return this.servicesRepository.create(services);
  }

  @get('/services/count')
  @response(200, {
    description: 'Services model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Services) where?: Where<Services>,
  ): Promise<Count> {
    return this.servicesRepository.count(where);
  }

  @get('/services')
  @response(200, {
    description: 'Array of Services model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Services, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Services) filter?: Filter<Services>,
  ): Promise<Services[]> {
    return this.servicesRepository.find(filter);
  }

  @patch('/services')
  @response(200, {
    description: 'Services PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Services, {partial: true}),
        },
      },
    })
    services: Services,
    @param.where(Services) where?: Where<Services>,
  ): Promise<Count> {
    return this.servicesRepository.updateAll(services, where);
  }

  @get('/services/{id}')
  @response(200, {
    description: 'Services model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Services, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Services, {exclude: 'where'}) filter?: FilterExcludingWhere<Services>
  ): Promise<Services> {
    return this.servicesRepository.findById(id, filter);
  }

  @patch('/services/{id}')
  @response(204, {
    description: 'Services PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Services, {partial: true}),
        },
      },
    })
    services: Services,
  ): Promise<void> {
    await this.servicesRepository.updateById(id, services);
  }

  @put('/services/{id}')
  @response(204, {
    description: 'Services PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() services: Services,
  ): Promise<void> {
    await this.servicesRepository.replaceById(id, services);
  }

  @del('/services/{id}')
  @response(204, {
    description: 'Services DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.servicesRepository.deleteById(id);
  }
}
