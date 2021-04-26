'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const categoryModel = db.tthh.vrescue.categoriesequipments;

const staffMdl = db.tthh.staff;

const personMdl = db.resources.persons;

module.exports ={

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
			const where = {
				[Op.or]: [
					{ categoria_nombre: { [Op.iLike]: '%' + filter + '%'} },
				]
			};
			const { rows, count } = await categoryModel.findAndCountAll(
				{
					where: where,
					include: [
						{ 
							model: staffMdl, as: 'user', 
							attributes: [ 'personal_id','personal_correo_institucional' ],
							include: [
								{
									model: personMdl, as: 'person', 
									attributes: [ 'persona_apellidos','persona_nombres' ] 
								}
							]
						}
					],
					offset: offset,
					limit: limit,
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'RESCATE VERTICAL - CATEGORIAS DE EQUIPOS DE RESCATE');
		} catch (error) {
			db.setEmpty(res,'RESCATE VERTICAL - LISTADO DE FORMULARIOS DE DAÑOS',false,error);
		}

	},

	// LISTADO DE FORMULARIOS
	findAll(req, res){
		categoryModel.findAll({
			order: [ [ 'categoria_nombre' ] ]
		}).then(data => {
			db.setJSON(res,data,'LISTADO DE CATEGORIAS DE EQUIPOS DE RESCATE VERTICAL');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

}