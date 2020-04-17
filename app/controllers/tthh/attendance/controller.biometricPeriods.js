'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const periodModel = db.biometricPeriods;
const markings = db.biometricMarkings;

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
			const where = { periodo_nombre: seq.where(seq.fn('LOWER', seq.col('periodo_nombre')), 'LIKE', '%' + filter + '%') };
			
			// STRING DE CONSULTA 
			let count = periodModel.count({ where: where });
			let rows = await periodModel.findAll({
				offset: offset,
				limit: limit,
				order: [ sort ],
				where: where,
				include: [
					{ 
						model: markings, as: 'markings',
						where: { marcacion_estado: [ 'ERROR' ] },
						attributes: [ 'marcacion_id' ],
						required: false
					}
				]
			});

			const meta = paginate(currentPage, count.length, rows, pageLimit);

			db.setDataTable(res,{ rows, meta },'REGISTRO DE PERIODOS');

		} catch (error) { db.setEmpty(res,'REGISTRO DE PERIODOS',false,error); }

	},

	/*
	 * INGRESO DE REGISTROS
	 */
    async findById(req, res){

        // ACTUALIZAR DATOS DE BIOMETRICO
        let period = await periodModel.findOne({
			where: { periodo_id: req.body.id }
		});

        // RETORNAR CONSULTA
        db.setEmpty(res,'REGISTRO BIOMETRICO - PERIODO',true,period);
               
	},

	/*
	 * INGRESO DE REGISTROS
	 */
    async insertEntity(req, res){

        // ACTUALIZAR DATOS DE BIOMETRICO
        let period = await periodModel.create(req.body);

        // RETORNAR CONSULTA
        db.setEmpty(res,'DATOS GUARDADOS CORRECTAMENTE',true,period);
               
	},
	
	
	/*
	 * ACTUALIZACIÓN DE MARCACIONES
	 */
    async updateEntity(req, res){

        // BUSCAR MODELO
		let period = await periodModel.findByPk(req.body.periodo_id);
		
        // ACTUALIZAR DATOS DE BIOMETRICO
        await period.update(req.body);

        // RETORNAR CONSULTA
        db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE',true,period);
               
    }

};