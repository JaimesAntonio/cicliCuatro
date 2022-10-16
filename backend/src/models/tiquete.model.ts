import {Entity, model, property} from '@loopback/repository';

@model()
export class Tiquete extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @property({
    type: 'string',
  })
  vuelosId?: string;

  constructor(data?: Partial<Tiquete>) {
    super(data);
  }
}

export interface TiqueteRelations {
  // describe navigational properties here
}

export type TiqueteWithRelations = Tiquete & TiqueteRelations;
