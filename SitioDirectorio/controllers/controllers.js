'use strict'

const { countDocuments } = require("../models/clientes");
var validator = require('validator');
var Cliente = require('../models/clientes');
const clientes = require("../models/clientes");

var controller={
    datosCurso:(req,res)=>{
        return res.status(200).send({
            curso:"Grupo 21-22",
            tema: "servidor Express",
            basedaros:"MongoDB"
        });
    },

    getToken:(req,res)=>{
        var crypto = require("crypto");  
  
        function getAuthorizationTokenUsingMasterKey(verb, resourceType, resourceId, date, masterKey) {  
        var key = new Buffer(masterKey, "base64");  
  
        var text = (verb || "").toLowerCase() + "\n" +   
               (resourceType || "").toLowerCase() + "\n" +   
               (resourceId || "") + "\n" +   
               date.toLowerCase() + "\n" +   
               "" + "\n";  
  
        var body = new Buffer(text, "utf8");  
        var signature = crypto.createHmac("sha256", key).update(body).digest("base64");  
  
        var MasterToken = "master";  
  
        var TokenVersion = "1.0";  
  
        return encodeURIComponent("type=" + MasterToken + "&ver=" + TokenVersion + "&sig=" + signature);  
        } 
        var verb="post";
        var resourceType="sprocs";
        var resourceId="dbs/hero_db/colls/hero/sprocs/testHero";
        var resourceId1="dbs/dbPruebaIft/colls/Container1/sprocs/SP_sectorFinanDia";
        var resourceId2="dbs/dbPruebaIft/colls/Container1/sprocs/SP_cuentasVigentes_obligaciones";
        const date = new Date(Date.now()).toUTCString();
        var masterKey="I00cNBSxRE9O2oJaalIFg0zONtlE7z4lTK05mp0PFrYJPMqFMdVrxj0eiVQKbP6YpdThIXo2cuxZbDNB183D9Q==";
        var obtenerTokenHero= getAuthorizationTokenUsingMasterKey(verb,resourceType,resourceId,date,"I00cNBSxRE9O2oJaalIFg0zONtlE7z4lTK05mp0PFrYJPMqFMdVrxj0eiVQKbP6YpdThIXo2cuxZbDNB183D9Q==");
        var obtenerTokenSfDia= getAuthorizationTokenUsingMasterKey(verb,resourceType,resourceId1,date,"I00cNBSxRE9O2oJaalIFg0zONtlE7z4lTK05mp0PFrYJPMqFMdVrxj0eiVQKbP6YpdThIXo2cuxZbDNB183D9Q==");
        var obtenerTokenObVig= getAuthorizationTokenUsingMasterKey(verb,resourceType,resourceId2,date,"I00cNBSxRE9O2oJaalIFg0zONtlE7z4lTK05mp0PFrYJPMqFMdVrxj0eiVQKbP6YpdThIXo2cuxZbDNB183D9Q==");
        return res.status(200).send({
            tokenHero: obtenerTokenHero,
            tokenSfDia: obtenerTokenSfDia,
            tokenObVigen: obtenerTokenObVig,
            dateNow: date
            
        });
    },



    test:(req,res)=>{
        return res.status(200).send({
            mesagge:"Soy la accion test de mi controlador de consultas"
        });
    },

    crear:(req,res)=>{
        var params= req.body;
        console.log(params);
        try {
            var validate_nombre=!validator.isEmpty(params.nombre);
            var validate_direccion=!validator.isEmpty(params.direccion);
            var validate_ciudad=!validator.isEmpty(params.ciudad);
            var validate_telefono=!validator.isEmpty(params.telefono);
            console.log(validate_nombre,validate_direccion,validate_ciudad,validate_telefono);
        } catch (error) {
            console.log(validate_nombre,validate_direccion,validate_ciudad,validate_telefono);
            return res.status(200).send({
                status:'Error',
                message:'Faltan datos por enviar'
            });
        }
            if(validate_nombre && validate_direccion && validate_ciudad && validate_telefono){
                var cliente= new Cliente();
                cliente.nombre= params.nombre;
                cliente.direccion= params.direccion;
                cliente.ciudad=params.ciudad;
                cliente.telefono=params.telefono;

                cliente.save((error,contMes)=>{
                    if(error || !cliente){
                        return res.status(404).send({
                            status:'Error',
                            message:'El cliente no ha sido guadrado'
                        });
                    }
                    return res.status(200).send({
                        status:'Exitoso',
                        cliente: contMes
                    });
                    
                })
            }
            else{
                return res.status(200).send({
                    status:'Error',
                    mesagge:'Los datos no son validos'
                });
            }
        
    },

    getClientes:(req,res)=>{
        var query= Cliente.find({});
        query.sort('-_id').exec((err,clientes)=>{
            if (err){
                return res.status(500).send({
                    status:'Error',
                    message: 'Error al devolver los clientes'
                });
            }
            if(!clientes){
                return res.status(404).send({
                    status:'Error',
                    message:'No hay clientes para mostrar'
                })
            }
            return res.status(200).send({
                status:'success',
                clientes1: clientes 
            })
        }
        )
    },

    getCliente:(req,res)=>{
        var clienteId=req.params.id;
        if(!clienteId|| clienteId== null){
            return res.status(404).send({
                status:'Error',
                message:'No existe el cliente'
            });
            
        }
        Cliente.findById(clienteId,(err,clientes)=>{
            if(err || !clientes){
                return res.status(404).send({
                    status: 'Error',
                    mesagge: 'No existe el cliente'
                });
            }
            return res.status(200).send({
                status: 'success',
                clientes
            })
        })
    },

    update:(req,res)=>{
        var clienteId= req.params.id;
        var params= req.body;
        try {
            var validate_nombre=!validator.isEmpty(params.nombre);
            var validate_direccion= !validator.isEmpty(params.direccion);
            var validate_ciudad=!validator.isEmpty(params.ciudad);
            var validate_telefono=!validator.isEmpty(params.telefono);

        } catch (error) {
            return res.status.send({
                status:'Error',
                message:'Faltan datos por enviar'
            });
            
        }
        if(validate_nombre && validate_direccion && validate_ciudad && validate_telefono){
            Cliente.findByIdAndUpdate({
                _id:clienteId
            }, params,{new:true}, (err,clienteUpdate)=>{
                if(err){
                    return res.status(500).send({
                        status:'Error',
                        mesagge: 'Error al actualizar el cliente'
                    })
                }
                if(!clienteUpdate){
                    return res.status(404).send({
                        status:'Error',
                        mesagge:'No existe client'
                    })
                }
                return res.status(200).send({
                    status:'success',
                    cliente: clienteUpdate
                })
            });
            
        }else{
            return res.status(200).send({
                status:'Error',
                mesagge:'La validacion no es correcta'
            })
        }


    },

    delete :(req,res)=>{
        var clienteId= req.params.id;
        Cliente.findOneAndDelete({_id:clienteId},(err,clienteRemoved)=>{
            if(err){
                return res.status(500).send({
                    status:'Error',
                    mesagge:'Error al borrar el cliente'
                })
            }
            if(!clienteRemoved){
                return res.status(500).send({
                    status:'Error',
                    message:'Nose ha borrado el cliente, no existe'
                })
            }
            return res.status(200).send({
                status:'Success',
                cliente:clienteRemoved
            })

        })
    }

}

module.exports= controller;