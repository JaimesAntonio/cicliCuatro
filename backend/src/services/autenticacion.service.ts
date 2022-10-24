import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require("password-generator"); 
const cryptojs = require("crypto.js");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

generarClave(){
  let clave = generador(8, false);
  return clave;
}

cifrarClave(clave:string){
  let claveCifrada = cryptojs.MD5(clave).toString();
  return claveCifrada;
} 
}
