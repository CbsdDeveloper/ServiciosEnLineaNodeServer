'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.ppersonal;

const staffModel = db.staff;
const personModel = db.persons;
const jobModel = db.jobs;
const leadershipModel = db.leaderships;
const stationModel = db.stations;

module.exports = {

    /**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationByLeadership(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
            
            const str = {
                offset: offset,
                limit: limit,
                include: [
                    {
                        model: staffModel, as: 'staff',
                        attributes: [ 'personal_correo_institucional','personal_estado' ],
                        include: [
                            {
                                model: personModel, as: 'person',
                                attributes: [ 'persona_apellidos','persona_nombres','persona_doc_identidad','persona_direccion','persona_telefono','persona_celular','persona_correo','persona_imagen' ],
                                where: seq.or(
                                    { persona_apellidos: seq.where(seq.fn('LOWER', seq.col('persona_apellidos')), 'LIKE', '%' + filter + '%') },
                                    { persona_nombres: seq.where(seq.fn('LOWER', seq.col('persona_nombres')), 'LIKE', '%' + filter + '%') },
                                    { persona_doc_identidad: seq.where(seq.fn('LOWER', seq.col('persona_doc_identidad')), 'LIKE', '%' + filter + '%') }
                                ),
                                required: true
                            },
                            {
                                model: stationModel, as: 'station',
                                attributes: [ 'estacion_nombre','estacion_nombre_alterno' ]
                            }
                        ],
                        required: true
                    },
                    {
                        model: jobModel, as: 'job',
                        attributes: [ 'puesto_nombre','puesto_grado' ],
                        include: [
                            {
                                model: leadershipModel, as: 'leadership',
                                attributes: [ 'direccion_nombre' ],
                                where: {
                                    direccion_id: req.query.leadershipId
                                },
                                required: true
                            }
                        ],
                        required: true
                    }
                ]
			};

            const count = await model.count(str);
            const rows = await model.findAll(str);
            
            const meta = paginate(currentPage, count, rows.length, pageLimit);
            
			db.setDataTable(res,{ rows, meta },'LISTADO DE PERSONAL DE LA DIRECCION');
		} catch (error) {
			db.setEmpty(res,'LISTADO DE PERSONAL DE LA DIRECCION',false,error);
		}

	}

};
