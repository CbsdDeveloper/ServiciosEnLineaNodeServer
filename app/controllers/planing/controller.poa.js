'use strict';
const db = require('../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const poaModel = db.planing.poa;

const reformMdl = db.planing.reforms;
const programMdl = db.planing.programspoa;
const projectMdl = db.planing.poaprojects;

const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;

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
			const whr = {
				[Op.or]: [
					{ poa_periodo: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await poaModel.findAndCountAll({
				include: [
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					},
					{
						model: reformMdl, as: 'reforms',
						include: [{
							model: staffMdl, as: 'user',
							attributes: ['personal_correo_institucional'],
							include: [{
								model: personMdl, as: 'person',
								attributes: ['persona_nombres','persona_apellidos']
							}]
						}],
						where: {
							reforma_estado: ['PLANIFICACION','VIGENTE']
						},
						required: false
					}
				],
				offset: offset,
				limit: limit,
				where: whr,
				order: [ sort ]
			});	
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'PLANIFICACION - LISTAR POA');
		} catch (error) {
			db.setEmpty(res,'PLANIFICACION - POA',false,error);
		}

	},

	/*
	 * BUSCAR LOCAL POR ID
	 */
	async findById(req, res){
		
		try {

			// VALIDAR CONSULTA
			let poa = await poaModel.findOne({
				where:{ poa_id: req.body.poaId },
				include: [
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					},
					{
						model: reformMdl, as: 'reforms',
						include: [
							{
								model: staffMdl, as: 'user',
								attributes: ['personal_correo_institucional'],
								include: [{
									model: personMdl, as: 'person',
									attributes: ['persona_nombres','persona_apellidos']
								}]
							}
						]
					}
				]
			});

			let reform = await reformMdl.findOne({
				where:{ 
					reforma_estado: ['PLANIFICACION','VIGENTE'],
					fk_poa_id: req.body.poaId
				 },
				include: [
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					},
					{
						model: projectMdl, as: 'projects',
						include: [
							{
								model: staffMdl, as: 'user',
								attributes: ['personal_correo_institucional'],
								include: [{
									model: personMdl, as: 'person',
									attributes: ['persona_nombres','persona_apellidos']
								}]
							}
						]
					}
				]
			});

			// RETORNAR MODELO
			db.setEmpty(res,'DETALLE POA - ID',true,{poa, reform});
	
		} catch (error) {
			db.setEmpty(res,'PLANIFICACION - PROGRAMAS POA',false,error);
		}

	},

};