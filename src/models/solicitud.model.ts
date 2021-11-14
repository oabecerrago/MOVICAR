import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {Alquiler} from './alquiler.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Solicitud extends Entity {
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
  idCliente: string;
  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaDevolucion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEntrega: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Asesor, {name: 'solicitud'})
  idAsesor: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasOne(() => Alquiler, {keyTo: 'idSolicitud'})
  alquiler: Alquiler;

  @hasMany(() => Vehiculo, {keyTo: 'idSolicitud'})
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
