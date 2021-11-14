import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Notificacion extends Entity {
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
  viaEmail: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  viaSms: boolean;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @belongsTo(() => Usuario, {name: 'notificacion'})
  idUsuario: string;

  constructor(data?: Partial<Notificacion>) {
    super(data);
  }
}

export interface NotificacionRelations {
  // describe navigational properties here
}

export type NotificacionWithRelations = Notificacion & NotificacionRelations;
