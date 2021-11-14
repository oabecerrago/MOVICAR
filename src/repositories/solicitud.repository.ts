import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Asesor, Cliente, Alquiler, Vehiculo} from '../models';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';
import {AlquilerRepository} from './alquiler.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly solicitud: BelongsToAccessor<Asesor, typeof Solicitud.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Solicitud.prototype.id>;

  public readonly alquiler: HasOneRepositoryFactory<Alquiler, typeof Solicitud.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AlquilerRepository') protected alquilerRepositoryGetter: Getter<AlquilerRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.alquiler = this.createHasOneRepositoryFactoryFor('alquiler', alquilerRepositoryGetter);
    this.registerInclusionResolver('alquiler', this.alquiler.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', asesorRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
