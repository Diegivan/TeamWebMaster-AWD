import {Entity, model, property} from '@loopback/repository';

@model()
export class Appointments extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  Adress: string;

  @property({
    type: 'string',
    required: true,
  })
  Reference: string;

  @property({
    type: 'string',
    required: true,
  })
  Date: string;

  @property({
    type: 'string',
    required: true,
  })
  Plate: string;

  @property({
    type: 'string',
    required: true,
  })
  Cars: string;

  @property({
    type: 'string',
    required: true,
  })
  Services: string;

  @property({
    type: 'string',
    required: true,
  })
  Hours: string;

  @property({
    type: 'string',
    required: true,
  })
  Status: string;

  @property({
    type: 'string',
    required: true,
  })
  Obs: string;


  constructor(data?: Partial<Appointments>) {
    super(data);
  }
}

export interface AppointmentsRelations {
  // describe navigational properties here
}

export type AppointmentsWithRelations = Appointments & AppointmentsRelations;
