import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {Login} from './login.model';
import {Notificacion} from './notificacion.model';

@model()
export class Usuario extends Entity {
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
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_celular: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_fijo: string;

  @property({
    type: 'number',
    required: true,
  })
  documento_identificacion: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo_documento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: false,
  })
  password: string;

  @hasOne(() => Administrador, {keyTo: 'idUsuario'})
  administrador: Administrador;

  @hasMany(() => Notificacion, {keyTo: 'idUsuario'})
  notificacions: Notificacion[];

  @hasOne(() => Asesor, {keyTo: 'idUsuario'})
  asesor: Asesor;

  @hasOne(() => Cliente, {keyTo: 'idUsuario'})
  cliente: Cliente;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
