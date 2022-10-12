import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Aeropuertos extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @property({
    type: 'number',
    required: true,
  })
  coordx: number;

  @property({
    type: 'number',
    required: true,
  })
  coordy: number;

  @property({
    type: 'string',
    required: true,
  })
  sigla: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Aeropuertos>) {
    super(data);
  }
}

export interface AeropuertosRelations {
  // describe navigational properties here
}

export type AeropuertosWithRelations = Aeropuertos & AeropuertosRelations;
