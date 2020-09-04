'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const serieModel = db.administrative.archiveseries;

const leadershipMdl = db.tthh.leaderships;

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
					{ serie_nombre: { [Op.iLike]: '%' + filter + '%'} },
					{ subserie_nombre: { [Op.iLike]: '%' + filter + '%'} },
					{ codigo_archivo: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await serieModel.findAndCountAll({
				include: [
					{
						model: leadershipMdl, as: 'section',
						required: false
					},
					{
						model: leadershipMdl, as: 'subsection',
						required: false
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
				limit: limit,
				where: whr,
				order: [ sort ]
			});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ARCHIVO - SERIE DOCUMENTAL');
		} catch (error) {
			db.setEmpty(res,'ARCHIVO - SERIE DOCUMENTAL',false,error);
		}

	}

};
