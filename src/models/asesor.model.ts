import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Asesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  creaVehiculo: boolean;

  @property({
    type: 'string',
    required: true,
  })
  contactoCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;

  @hasMany(() => Solicitud, {keyTo: 'idAsesor'})
  solicituds: Solicitud[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
