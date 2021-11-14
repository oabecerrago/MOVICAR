import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Login,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioLoginController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/login', {
    responses: {
      '200': {
        description: 'Usuario has one Login',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Login),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Login>,
  ): Promise<Login> {
    return this.usuarioRepository.login(id).get(filter);
  }

  @post('/usuarios/{id}/login', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Login)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {
            title: 'NewLoginInUsuario',
            exclude: ['id'],
            optional: ['idUsuario']
          }),
        },
      },
    }) login: Omit<Login, 'id'>,
  ): Promise<Login> {
    return this.usuarioRepository.login(id).create(login);
  }

  @patch('/usuarios/{id}/login', {
    responses: {
      '200': {
        description: 'Usuario.Login PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {partial: true}),
        },
      },
    })
    login: Partial<Login>,
    @param.query.object('where', getWhereSchemaFor(Login)) where?: Where<Login>,
  ): Promise<Count> {
    return this.usuarioRepository.login(id).patch(login, where);
  }

  @del('/usuarios/{id}/login', {
    responses: {
      '200': {
        description: 'Usuario.Login DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Login)) where?: Where<Login>,
  ): Promise<Count> {
    return this.usuarioRepository.login(id).delete(where);
  }
}
