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
import {Appointments} from '../models';
import {AppointmentsRepository} from '../repositories';

export class AppointmentsController {
  constructor(
    @repository(AppointmentsRepository)
    public appointmentsRepository : AppointmentsRepository,
  ) {}

  @post('/appointments')
  @response(200, {
    description: 'Appointments model instance',
    content: {'application/json': {schema: getModelSchemaRef(Appointments)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointments, {
            title: 'NewAppointments',
            exclude: ['id'],
          }),
        },
      },
    })
    appointments: Omit<Appointments, 'id'>,
  ): Promise<Appointments> {
    return this.appointmentsRepository.create(appointments);
  }

  @get('/appointments/count')
  @response(200, {
    description: 'Appointments model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Appointments) where?: Where<Appointments>,
  ): Promise<Count> {
    return this.appointmentsRepository.count(where);
  }

  @get('/appointments')
  @response(200, {
    description: 'Array of Appointments model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Appointments, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Appointments) filter?: Filter<Appointments>,
  ): Promise<Appointments[]> {
    return this.appointmentsRepository.find(filter);
  }

  @patch('/appointments')
  @response(200, {
    description: 'Appointments PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointments, {partial: true}),
        },
      },
    })
    appointments: Appointments,
    @param.where(Appointments) where?: Where<Appointments>,
  ): Promise<Count> {
    return this.appointmentsRepository.updateAll(appointments, where);
  }

  @get('/appointments/{id}')
  @response(200, {
    description: 'Appointments model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Appointments, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Appointments, {exclude: 'where'}) filter?: FilterExcludingWhere<Appointments>
  ): Promise<Appointments> {
    return this.appointmentsRepository.findById(id, filter);
  }

  @patch('/appointments/{id}')
  @response(204, {
    description: 'Appointments PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointments, {partial: true}),
        },
      },
    })
    appointments: Appointments,
  ): Promise<void> {
    await this.appointmentsRepository.updateById(id, appointments);
  }

  @put('/appointments/{id}')
  @response(204, {
    description: 'Appointments PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() appointments: Appointments,
  ): Promise<void> {
    await this.appointmentsRepository.replaceById(id, appointments);
  }

  @del('/appointments/{id}')
  @response(204, {
    description: 'Appointments DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.appointmentsRepository.deleteById(id);
  }
}
