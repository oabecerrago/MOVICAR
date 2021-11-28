import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Administrador, Notificacion, Asesor, Cliente} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {NotificacionRepository} from './notificacion.repository';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly administrador: HasOneRepositoryFactory<Administrador, typeof Usuario.prototype.id>;

  public readonly notificacions: HasManyRepositoryFactory<Notificacion, typeof Usuario.prototype.id>;

  public readonly asesor: HasOneRepositoryFactory<Asesor, typeof Usuario.prototype.id>;

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
    @repository.getter('NotificacionRepository') protected notificacionRepositoryGetter: Getter<NotificacionRepository>,
    @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
    @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Usuario, dataSource);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.asesor = this.createHasOneRepositoryFactoryFor('asesor', asesorRepositoryGetter);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.notificacions = this.createHasManyRepositoryFactoryFor('notificacions', notificacionRepositoryGetter,);
    this.registerInclusionResolver('notificacions', this.notificacions.inclusionResolver);
    this.administrador = this.createHasOneRepositoryFactoryFor('administrador', administradorRepositoryGetter);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
