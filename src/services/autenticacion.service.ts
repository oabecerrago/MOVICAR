import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require("password-generator")
const cryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public UsuarioRepository: UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */

  Generarclave(){
    let clave = generador(8, false); //8 es la longitud de la clave
                                    //false es la intensidad de la clave para memorizar
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarUsuario(usuario: string, clave: string){
    try{
      let p = this.UsuarioRepository.findOne({where: {correo_electronico: usuario, clave: clave}});
      if(p){
        return p;
      }
      return false;
    }catch{
      return false;
    }
  }

  GenerarTokenJWT(usuario: Usuario){
    let token = jwt.sign({
      data:{
      id: usuario.id,
      correo: usuario.correo_electronico,
      nombre: usuario.nombre +" "+ usuario.apellido
    }
    },
    Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string){
    try{
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
