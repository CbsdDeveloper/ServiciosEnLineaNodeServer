'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.financialtypedocuments;
const staffModel = db.staff;
const personModel = db.persons;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'documento_codigo' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				$or: {
					documento_codigo: seq.where(seq.fn('LOWER', seq.col('documento_codigo')), 'LIKE', '%' + filter + '%'),
					documento_nombre: seq.where(seq.fn('LOWER', seq.col('documento_nombre')), 'LIKE', '%' + filter + '%')
				}
			};
			const incStaff = {
				model: staffModel, as: 'staff', attributes: ['personal_correo_institucional'], 
				include: [{ model: personModel, as: 'person', attributes: [[seq.literal("persona_apellidos||' '||persona_nombres"),"usuario"]] }]
			};
			const { rows, count } = await model.findAndCountAll(
				{
					include:[ incStaff ],
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'TIPOS DE DOCUMENTOS FINANCIEROS');
		} catch (error) {
			db.setEmpty(res,'TIPOS DE DOCUMENTOS FINANCIEROS',false,error);
		}

	}

};
