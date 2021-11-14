import {Entity, model, property} from '@loopback/repository';

@model()
export class Administrador extends Entity {
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
  idUsuario: string;

  @property({
    type: 'boolean',
    required: true,
  })
  creaAsesor: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  creaVehiculo: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  creaOferta: boolean;


  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
