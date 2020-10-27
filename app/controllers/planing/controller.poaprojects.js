'use strict';
const db = require('../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const projectModel = db.planing.poaprojects;

const poaMdl = db.planing.poa;
const programMdl = db.planing.programspoa;

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
					{ programa_nombre: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await projectModel.findAndCountAll({
				include: [
					{
						model: programMdl, as: 'program'
					},
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					}
				],
				offset: offset,
				limit: limit
			});	
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'PLANIFICACION - LISTAR PROYECTOS DE POA');
		} catch (error) {
			db.setEmpty(res,'PLANIFICACION - LISTAR PROYECTOS DE POA',false,error);
		}

	},

	// FETCH All Customers
	findAll(req, res){
		projectModel.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE PROYECTOS DEL POA');
		}).catch(err => {res.status(500).json({msg: "error", details: err});});
	},

	// FETCH All Customers
	async findByReform(req, res){
		
		try {
				
			// CONDICIONAL
			let data = await projectModel.findAll({
				where: { fk_reforma_id: req.body.reformId },
				include:[
					{
						model: programMdl, as: 'program'
					}
				],
				order: [
					[ { model: programMdl, as: 'program' }, 'programa_nombre', 'ASC' ]
				]
			});

			// RETORNAR MODELO
			db.setEmpty(res,'LISTADO DE PROYECTOS DE LA ULTIMA REFORMA',true,data);
			
		} catch (error) {
			db.setEmpty(res,'LISTADO DE PROYECTOS DE LA ULTIMA REFORMA',false,error);
		}


	}
	
};
