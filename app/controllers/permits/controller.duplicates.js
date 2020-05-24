'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');


const duplicateModel = db.duplicates;
const permitMdl = db.permitsLocals;
const selfInspectionMdl = db.selfInspections;

const userMdl = db.users;
const localMdl = db.locals;
const entityMdl = db.entities;

const ppersonalMdl = db.ppersonal;
const staffMdl = db.staff;
const personMdl = db.persons;
const jobMdl = db.jobs;
// VARIABLES GLOBALES
var strWhr;

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
				{ codigo_per: seq.where(seq.fn('LOWER', seq.col('codigo_per')), 'LIKE', '%' + filter + '%') },

				{ local_nombrecomercial: seq.where(seq.fn('LOWER', seq.col('local_nombrecomercial')), 'LIKE', '%' + filter + '%') },
				{ entidad_razonsocial: seq.where(seq.fn('LOWER', seq.col('entidad_razonsocial')), 'LIKE', '%' + filter + '%') },
				{ entidad_ruc: seq.where(seq.fn('LOWER', seq.col('entidad_ruc')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await duplicateModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: permitMdl, as: 'permit',
							attributes: [ 'permiso_id','permiso_fecha','codigo_per' ],
							include: [
								{
									model: selfInspectionMdl, as: 'selfInspection',
									attributes: [ 'autoinspeccion_id','autoinspeccion_codigo','autoinspeccion_fecha' ],
									include: [
										{
											model: localMdl, as: 'local',
											attributes: [ 'local_id','local_nombrecomercial' ],
											include: [
												{ 
													model: entityMdl, as: 'entity',
													attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ]
												}
											]
										}
									]
								}
							]
						},
						{ 
							model: userMdl, as: 'requesting',
							attributes: [ ['usuario_login','usuario'] ]
						},
						{ 
							model: userMdl, as: 'approving',
							required: false,
							attributes: [ ['usuario_login','usuario'] ]
						},
						{ 
							model: userMdl, as: 'downloading',
							required: false,
							attributes: [ ['usuario_login','usuario'] ]
						},
						{
							model: ppersonalMdl, as: 'jtprequest',
							required: false,
							attributes: [ 'ppersonal_id' ],
							include: [
								{
									model: staffMdl, as: 'staff',
									attributes: [ 'personal_id' ],
									include: [
										{
											model: personMdl, as: 'person',
											attributes: [ 'persona_id', 'persona_apellidos','persona_nombres','persona_doc_identidad','persona_titulo' ]
										}
									]
								},
								{
									model: jobMdl, as: 'job',
									attributes: [ 'puesto_id','puesto_nombre' ],
								}
							 ]
						},
						{
							model: ppersonalMdl, as: 'jtpapprove',
							required: false,
							attributes: [ 'ppersonal_id' ],
							include: [
								{
									model: staffMdl, as: 'staff',
									attributes: [ 'personal_id' ],
									include: [
										{
											model: personMdl, as: 'person',
											attributes: [ 'persona_id', 'persona_apellidos','persona_nombres','persona_doc_identidad','persona_titulo' ]
										}
									]
								},
								{
									model: jobMdl, as: 'job',
									attributes: [ 'puesto_id','puesto_nombre' ],
								}
							 ]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ENTIDADES COMERCIALES');
		} catch (error) {
			db.setEmpty(res,'ENTIDADES COMERCIALES',false,error);
		}

	}

};
