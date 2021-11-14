import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Notificacion} from '../models';
import {NotificacionRepository} from '../repositories';

export class NotificacionController {
  constructor(
    @repository(NotificacionRepository)
    public notificacionRepository : NotificacionRepository,
  ) {}

  @post('/notificacions')
  @response(200, {
    description: 'Notificacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Notificacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {
            title: 'NewNotificacion',
            exclude: ['id'],
          }),
        },
      },
    })
    notificacion: Omit<Notificacion, 'id'>,
  ): Promise<Notificacion> {
    return this.notificacionRepository.create(notificacion);
  }

  @get('/notificacions/count')
  @response(200, {
    description: 'Notificacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Notificacion) where?: Where<Notificacion>,
  ): Promise<Count> {
    return this.notificacionRepository.count(where);
  }

  @get('/notificacions')
  @response(200, {
    description: 'Array of Notificacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Notificacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Notificacion) filter?: Filter<Notificacion>,
  ): Promise<Notificacion[]> {
    return this.notificacionRepository.find(filter);
  }

  @patch('/notificacions')
  @response(200, {
    description: 'Notificacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {partial: true}),
        },
      },
    })
    notificacion: Notificacion,
    @param.where(Notificacion) where?: Where<Notificacion>,
  ): Promise<Count> {
    return this.notificacionRepository.updateAll(notificacion, where);
  }

  @get('/notificacions/{id}')
  @response(200, {
    description: 'Notificacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Notificacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Notificacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Notificacion>
  ): Promise<Notificacion> {
    return this.notificacionRepository.findById(id, filter);
  }

  @patch('/notificacions/{id}')
  @response(204, {
    description: 'Notificacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {partial: true}),
        },
      },
    })
    notificacion: Notificacion,
  ): Promise<void> {
    await this.notificacionRepository.updateById(id, notificacion);
  }

  @put('/notificacions/{id}')
  @response(204, {
    description: 'Notificacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() notificacion: Notificacion,
  ): Promise<void> {
    await this.notificacionRepository.replaceById(id, notificacion);
  }

  @del('/notificacions/{id}')
  @response(204, {
    description: 'Notificacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.notificacionRepository.deleteById(id);
  }
}
