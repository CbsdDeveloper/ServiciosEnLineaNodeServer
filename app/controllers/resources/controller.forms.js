'use strict';
const db = require('../../models');
const seq = db.sequelize;
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const formModel = db.resources.forms;

const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;

module.exports = {

	/**
	 * @function paginationEntity - FORMULARIOS PARA ENCUESTAS
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationSurveysForms(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				[Op.and]: [
					//{ formulario_tipo: 'EVALUACIÓN COVID19' },
					{ formulario_nombre: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await formModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: where,
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

	/**
	 * @function paginationEntity - FORMULARIOS PARA EVALUACION DE EQUIPOS DE RESCATE VERTICAL
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationVRescueForms(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				[Op.and]: [
					{ formulario_tipo: 'RESCATE VERTICAL' },
					{ formulario_nombre: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await formModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: where,
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
	findAllvRescueforms(req, res){
		formModel.findAll({ where: { formulario_tipo: 'RESCATE VERTICAL' } }).then(data => {
			db.setEmpty(res,'LISTADO DE FORMULARIOS PARA EVALUACION DE EQUIPOS DE RESCATE VERTICAL',true,data);
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},
	

	/*
	 * INFORMACION DE REGISTRO
	 */
	findById(req, res){
		formModel.findByPk(req.body.entityId).then(data => {
			db.setEmpty(res,'INFORMACION DE ENTIDAD',true,data);
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}


}
