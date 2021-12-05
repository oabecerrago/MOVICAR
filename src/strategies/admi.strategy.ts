import parseBearerToken from 'parse-bearer-token';
import { HttpErrors, Request } from '@loopback/rest';
import { request } from 'http';
import {AuthenticationStrategy} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';
import {service} from '@loopback/core';
import {AutenticacionService} from '../services';

export class EstrategiaAdministrador implements AuthenticationStrategy{
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public serviceAutentication: AutenticacionService
    ){
    }

  async authenticate(request: Request): Promise<UserProfile | undefined>{
    let token = parseBearerToken(request);
    if(token){
      let datos = this.serviceAutentication.ValidarTokenJWT(token);
      if(datos){
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      }else{
        throw new HttpErrors[401]("El token incluido no es válido");
      }
    }else{
      throw new HttpErrors[401]("No se ha incluido un token en la solicitud");
    }
  }
}
