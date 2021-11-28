import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {llaves} from '../config/llaves';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) { }

  /*
   * Add service methods here
   */

  GenerarPassword() {
    let password = generador(8, false);
    return password;
  }


  CifrarPassword(password: string) {
    let passwordCifrada = cryptoJS.MD5(password).toString();
    return passwordCifrada;
  }

  IdentificarUsuario(usuario: string, password: string) {
    try {
      let u = this.usuarioRepository.findOne({where: {correo_electronico: usuario, password: password}});
      if (u) {
        return u;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(usuario: Usuario) {
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo_electronico: usuario.correo_electronico,
        nombre: usuario.nombre + " " + usuario.apellido,
      },

    },
      llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try{
      let datos = jwt.verify(token, llaves.claveJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
