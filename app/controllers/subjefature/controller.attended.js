'use strict';
const db = require('../../models');
const seq = db.sequelize;

const model = db.attended;

module.exports = {

	/**
	 * @function attendedByPrtId
	*/
	async attendedByPrtId(req, res){
		try {
			
			// BUSCAR HERIDOS Y FALLECIDOS DE UN PARTE
			let woundedList = await model.findAll({ where: seq.and( { fk_parte_id: req.query.partId }, { atendido_tipo: ['HERIDOS','FALLECIDOS'] } ), order: ['atendido_nombre'] });
			// BUSCAR ATENDIDOS DE UN PARTE
			let attendedList = await model.findAll({ where: seq.and( { fk_parte_id: req.query.partId }, { atendido_tipo: ['ATENDIDOS'] } ), order: ['atendido_nombre'] });
			// RETORNO DE CONSULTA
			db.setEmpty(res,'PERSONAS Y ENTIDADES ATENDIDAS EN UN PARTE',true,{attended:attendedList,wounded:woundedList});

		} catch (error) {
			db.setEmpty(res,'PERSONAS Y ENTIDADES ATENDIDAS EN UN PARTE',false,error);
		}

	},

	/**
	 * @function newAttendedByPrtId
	*/
	async newAttendedByPrtId(req, res, next){

		try {

			// FORMULARIO ENVIADO
			let data = req.body;

			// VALIDAR EXISTENCIA DE ID
			await model.create( data );

			// ENVIAR RESPUESTA
			db.setEmpty(res,'REGISTRO DE PERSONAS Y ENTIDADES ATENDIDAS REALIZADO CORRECTAMENTE');

		} catch (error) { return db.endConection(res,next,'ERROR EN EL INGRESO Y ACTUALIZACIÓN PERSONAS Y ENTIDADES ATENDIDAS EN UN PARTE (00X1).'); }

	},

	/**
	 * @function removeAttendedByPrtId
	*/
	async removeAttendedByPrtId(req, res, next){

		try {

			// ELIMINAR REGISTRO
			model.destroy({ where: { atendido_id: req.query.entityId } });
			// ENVIAR RESPUESTA
			db.setEmpty(res,'REGISTRO DE PERSONAS Y ENTIDADES ATENDIDAS REALIZADO CORRECTAMENTE');

		} catch (error) { return db.endConection(res,next,'ERROR EN EL INGRESO Y ACTUALIZACIÓN PERSONAS Y ENTIDADES ATENDIDAS EN UN PARTE (00X1).'); }

	}

};