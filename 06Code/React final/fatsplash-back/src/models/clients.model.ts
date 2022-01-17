import {Entity, model, property} from '@loopback/repository';

@model()
export class Clients extends Entity {
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
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  ci: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  birthdate: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;


  constructor(data?: Partial<Clients>) {
    super(data);
  }
}

export interface ClientsRelations {
  // describe navigational properties here
}

export type ClientsWithRelations = Clients & ClientsRelations;
