import {Entity, model, property} from '@loopback/repository';

@model()
export class Services extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;


  constructor(data?: Partial<Services>) {
    super(data);
  }
}

export interface ServicesRelations {
  // describe navigational properties here
}

export type ServicesWithRelations = Services & ServicesRelations;
