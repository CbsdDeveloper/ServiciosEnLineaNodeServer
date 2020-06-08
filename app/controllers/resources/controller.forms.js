'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const formModel = db.rsc.forms;

const staffMdl = db.staff;
const personMdl = db.persons;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = seq.or(
				{ formulario_nombre: seq.where(seq.fn('LOWER', seq.col('formulario_nombre')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await formModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: staffMdl, as: 'user',
							attributes: [ 'personal_id' ],
							include: [
								{
									model: personMdl, as: 'person',
									attributes: [ 'persona_apellidos','persona_nombres' ]
								}
							]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'CLASIFICACION DE FORMULARIOS');
		} catch (error) {
			db.setEmpty(res,'CLASIFICACION DE FORMULARIOS',false,error);
		}

	},


	/*
	 * INFORMACION DE REGISTRO
	 */
	findById(req, res){
		formModel.findByPk(req.body.entityId).then(data => {
			db.setEmpty(res,'INFORMACION DE ENTIDAD',true,data);
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}


	/*
	findById = (req, res) => {
		psychosocialsectionsModel.findByPk(req.body.entityId,{
			include: [
				{
				  model: psychosocialformsModel,
				  as: 'form'
				}
			]
		}).then(data => {
			db.setEmpty(res,'INFORMACION DE ENTIDAD - SECCION DE FORMULARIO > ' + data.formulario_nombre,true,data);
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}
	*/


}