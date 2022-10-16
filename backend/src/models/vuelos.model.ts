import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pilotos} from './pilotos.model';
import {Aeropuertos} from './aeropuertos.model';

@model()
export class Vuelos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaIni: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFin: string;

  @property({
    type: 'date',
    required: true,
  })
  horaIni: string;

  @property({
    type: 'date',
    required: true,
  })
  horaFin: string;

  @property({
    type: 'number',
    required: true,
  })
  asientos: number;

  @property({
    type: 'string',
    required: true,
  })
  piloto: string;

  @belongsTo(() => Pilotos)
  pilotosId: string;

  @belongsTo(() => Aeropuertos)
  aeropuertosId: string;

  constructor(data?: Partial<Vuelos>) {
    super(data);
  }
}

export interface VuelosRelations {
  // describe navigational properties here
}

export type VuelosWithRelations = Vuelos & VuelosRelations;
