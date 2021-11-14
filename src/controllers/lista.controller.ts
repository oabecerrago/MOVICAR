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
import {Lista} from '../models';
import {ListaRepository} from '../repositories';

export class ListaController {
  constructor(
    @repository(ListaRepository)
    public listaRepository : ListaRepository,
  ) {}

  @post('/listas')
  @response(200, {
    description: 'Lista model instance',
    content: {'application/json': {schema: getModelSchemaRef(Lista)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lista, {
            title: 'NewLista',
            exclude: ['id'],
          }),
        },
      },
    })
    lista: Omit<Lista, 'id'>,
  ): Promise<Lista> {
    return this.listaRepository.create(lista);
  }

  @get('/listas/count')
  @response(200, {
    description: 'Lista model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Lista) where?: Where<Lista>,
  ): Promise<Count> {
    return this.listaRepository.count(where);
  }

  @get('/listas')
  @response(200, {
    description: 'Array of Lista model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Lista, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Lista) filter?: Filter<Lista>,
  ): Promise<Lista[]> {
    return this.listaRepository.find(filter);
  }

  @patch('/listas')
  @response(200, {
    description: 'Lista PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lista, {partial: true}),
        },
      },
    })
    lista: Lista,
    @param.where(Lista) where?: Where<Lista>,
  ): Promise<Count> {
    return this.listaRepository.updateAll(lista, where);
  }

  @get('/listas/{id}')
  @response(200, {
    description: 'Lista model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Lista, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Lista, {exclude: 'where'}) filter?: FilterExcludingWhere<Lista>
  ): Promise<Lista> {
    return this.listaRepository.findById(id, filter);
  }

  @patch('/listas/{id}')
  @response(204, {
    description: 'Lista PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lista, {partial: true}),
        },
      },
    })
    lista: Lista,
  ): Promise<void> {
    await this.listaRepository.updateById(id, lista);
  }

  @put('/listas/{id}')
  @response(204, {
    description: 'Lista PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lista: Lista,
  ): Promise<void> {
    await this.listaRepository.replaceById(id, lista);
  }

  @del('/listas/{id}')
  @response(204, {
    description: 'Lista DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.listaRepository.deleteById(id);
  }
}
