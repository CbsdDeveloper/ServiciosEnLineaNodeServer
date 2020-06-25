'use strict';
const db = require('../../models');
const seq = db.sequelize;

const model = db.subjefature.partSupplies;
const supplies = db.subjefature.aphSupplies;

module.exports = {

	/**
	 * @function attendedByPrtId
	*/
	async suppliesByPrtId(req, res){
		try {
			
			let suppliesList = await model.findAll({
				where: { fk_parte_id: req.query.partId },
				include: [ { model: supplies, as: 'supply' } ]
			});
			// RETORNO DE CONSULTA
			db.setEmpty(res,'INSUMOS UTILIZADOS EN PARTES',true,suppliesList);

		} catch (error) { return db.endConection(res,next,'ERROR EN EL INGRESO Y ACTUALIZACIÓN INSUMOS/MATERIALES PREHOSPITALARIOS EN UN PARTE (00X1).'); }
	},

	/**
	 * @function newAttendedByPrtId
	*/
	async newSupplyByPrtId(req, res, next){
		try {

			// FORMULARIO ENVIADO
			let data = req.body;
			// VALIDAR EXISTENCIA DE ID
			await model.create({
				fk_parte_id: data.fk_parte_id,
				insumo_cantidad: data.insumo_cantidad,
				fk_insumo_id: data.insumo.insumoid,
				fk_bodega_id: data.insumo.bodegaid
			});
			// ENVIAR RESPUESTA
			db.setEmpty(res,'REGISTRO DE INSUMOS/MATERIALES PREHOSPITALARIOS REALIZADO CORRECTAMENTE');

		} catch (error) { return db.endConection(res,next,'ERROR EN EL INGRESO Y ACTUALIZACIÓN INSUMOS/MATERIALES PREHOSPITALARIOS EN UN PARTE (00X1).'); }
	},

	/**
	 * @function newAttendedByPrtId
	*/
	async removeSupplyByPrtId(req, res, next){

		try {

			// ELIMINAR REGISTRO
			model.destroy({ where: { registro_id: req.query.entityId } });
			// ENVIAR RESPUESTA
			db.setEmpty(res,'REGISTRO DE INSUMOS/MATERIALES PREHOSPITALARIOS REALIZADO CORRECTAMENTE');

		} catch (error) { return db.endConection(res,next,'ERROR EN LA ELIMINACIÓN DE INSUMOS/MATERIALES PREHOSPITALARIOS EN UN PARTE (00X1).'); }

	}

};