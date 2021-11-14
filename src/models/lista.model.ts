import {Entity, model, property} from '@loopback/repository';

@model()
export class Lista extends Entity {
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
  alquileres: string;

  @property({
    type: 'string',
    required: true,
  })
  clientes: string;

  @property({
    type: 'string',
    required: true,
  })
  solicitudes: string;

  @property({
    type: 'string',
    required: true,
  })
  asesores: string;

  @property({
    type: 'string',
    required: true,
  })
  vehiculos: string;


  constructor(data?: Partial<Lista>) {
    super(data);
  }
}

export interface ListaRelations {
  // describe navigational properties here
}

export type ListaWithRelations = Lista & ListaRelations;
