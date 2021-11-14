import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Notificacion, NotificacionRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class NotificacionRepository extends DefaultCrudRepository<
  Notificacion,
  typeof Notificacion.prototype.id,
  NotificacionRelations
> {

  public readonly notificacion: BelongsToAccessor<Usuario, typeof Notificacion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Notificacion, dataSource);
    this.notificacion = this.createBelongsToAccessorFor('notificacion', usuarioRepositoryGetter,);
    this.registerInclusionResolver('notificacion', this.notificacion.inclusionResolver);
  }
}
