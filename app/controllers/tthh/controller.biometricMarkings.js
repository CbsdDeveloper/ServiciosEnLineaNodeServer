'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const markingModel = db.biometricMarkings;
const staff = db.staff;
const persons = db.persons;
const stations = db.stations;
const workdays = db.workdays;

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
			const where = [
				{
					fk_periodo_id: req.query.periodId
				},
				seq.or(
					{ estacion_nombre: seq.where(seq.fn('LOWER', seq.col('estacion_nombre')), 'LIKE', '%' + filter + '%') },
					{ marcacion_ingreso: seq.where(seq.fn('LOWER', seq.col('marcacion_ingreso')), 'LIKE', '%' + filter + '%') },
					{ persona_doc_identidad: seq.where(seq.fn('LOWER', seq.col('persona_doc_identidad')), 'LIKE', '%' + filter + '%') },
					{ persona_apellidos: seq.where(seq.fn('LOWER', seq.col('persona_apellidos')), 'LIKE', '%' + filter + '%') },
					{ persona_nombres: seq.where(seq.fn('LOWER', seq.col('persona_nombres')), 'LIKE', '%' + filter + '%') }
				)
			];
			const { rows, count } = await markingModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: where,
					order: [ sort ],
					include:[
						{
							model: staff, as: 'staff',
							attributes : ['personal_estado','personal_correo_institucional','biometrico_id','fk_jornada_id'],
							include: [ { 
								model: persons, as: 'person',
								attributes: ['persona_nombres','persona_apellidos','persona_doc_identidad']
							} ]
						},
						{
							model: stations, as: 'station',
							attributes: ['estacion_nombre', 'estacion_nombre_alterno']
						},
						{
							model: workdays, as: 'workday',
							attributes: ['jornada_nombre']
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'MARCACIONES DEL PERSONAL');
		} catch (error) {
			db.setEmpty(res,'MARCACIONES DEL PERSONAL',false,error);
		}

	},

	/*
	 * ACTUALIZACIÓN DE MARCACIONES
	 */
    async updateEntity(req, res){

        // BUSCAR MODELO DE WORKDAY
        const workday = await workdays.findByPk(req.body.fk_jornada_id);

        // BUSCAR MODELO
		let marking = await markingModel.findByPk(req.body.marcacion_id);
		
        // ACTUALIZAR JORNADA DE TRABAJO
		marking.setWorkday(workday);
		
		// CALCULO DE INGRESOS Y SALIDAS
		let ingresoSystem=new Date(req.body.marcacion_ingreso_sistema);
		let ingreso=new Date(req.body.marcacion_ingreso);
		let salidaSystem=new Date(req.body.marcacion_salida_sistema);
		let salida=new Date(req.body.marcacion_salida);
		
		req.body.marcacion_ingreso_extras=((ingresoSystem.getTime()-ingreso.getTime()) / (1000 * 60));
		req.body.marcacion_salida_extras=((salida.getTime()-salidaSystem.getTime()) / (1000 * 60));

        // ACTUALIZAR DATOS DE BIOMETRICO
        await marking.update(req.body);

        // RETORNAR CONSULTA
        db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE',true,marking);
               
    }

};