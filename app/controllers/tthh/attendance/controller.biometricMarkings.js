'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const markingModel = db.tthh.biometricMarkings;
const biometricperiods = db.tthh.biometricPeriods;
const staff = db.tthh.staff;
const persons = db.resources.persons;
const stations = db.tthh.stations;
const workdays = db.tthh.workdays;

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

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationNomarkingByPeriod(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = [
				{
					fk_periodo_id: req.query.periodId,
					marcacion_estado: [ 'ERROR' ]
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

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationNomarkingsByStaff(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = [
				{
					fk_periodo_id: req.query.periodId,
					fk_personal_id: req.query.staffId,
					marcacion_estado: ['ERROR']
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

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationStaffNomarkings(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = [
				{
					fk_periodo_id: req.query.periodId,
					marcacion_estado: [ 'ERROR' ]
				},
				seq.or(
					{ persona_doc_identidad: seq.where(seq.fn('LOWER', seq.col('staff.person.persona_doc_identidad')), 'LIKE', '%' + filter + '%') },
					{ persona_apellidos: seq.where(seq.fn('LOWER', seq.col('staff.person.persona_apellidos')), 'LIKE', '%' + filter + '%') },
					{ persona_nombres: seq.where(seq.fn('LOWER', seq.col('staff.person.persona_nombres')), 'LIKE', '%' + filter + '%') }
				)
			];
			// STRING DE CONSULTA 
			let rows = await markingModel.findAll({
				offset: offset,
				limit: limit,
				where: where,
				include: [ 
					{ 
						model:staff, as: 'staff',
						attributes: [ 'personal_correo_institucional' ],
						include: [ 
							{ 
								model: persons, as: 'person',
								attributes: [ 'persona_apellidos','persona_nombres','persona_doc_identidad' ]
							}
						]
					} 
				],
				attributes: [ 'fk_personal_id', 'fk_periodo_id', [ seq.fn('COUNT', seq.col('*')), 'total' ] ],
				group: [ 'fk_periodo_id', 'fk_personal_id', 'personal_id', 'personal_correo_institucional', 'persona_id', 'persona_apellidos','persona_nombres','persona_doc_identidad' ]
			});
			let count = await markingModel.count({ 
				where: { fk_periodo_id: req.query.periodId, marcacion_estado: [ 'ERROR' ] }, 
				group: [ 'fk_personal_id' ] 
			});

			const meta = paginate(currentPage, count.length, rows, pageLimit);
			// RETORNAR CONSULTA
			db.setDataTable(res,{ rows, meta },'APH - STOCK DE INSUMOS EN ESTACIONES',true);

		} catch (error) {
			db.setEmpty(res,'MARCACIONES DEL PERSONAL',false,error);
		}

	},

	/*
	 * INFORMACION DE MARCACIONES
	 */
    async getInfoNomarkingsByStaffId(req, res){
		// MODELO DE CONSUTA
		let data = { };
		// DATOS DE PERIODO
		data.period = await biometricperiods.findOne({ where: { periodo_id: req.body.id } });
		// DATOS DE PERSONAL
		data.staff = await staff.findOne({
			where: { personal_id: req.body.staffId },
			include: [ { model: persons, as:'person', attributes: [ 'persona_apellidos', 'persona_nombres' ] } ]
		});
        // RETORNAR CONSULTA
        db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE',true,data);
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
               
    },

	/*
	 * ACTUALIZAR LISTA DE MARCACIONES
	 */
    async updateEntityList(req, res, next){
		try {

			// FORMULARIO DE ENVIO
			let data = req.body, workday, marking,
				ingresoSystem, ingreso, salidaSystem, salida;

			let promises = data.map(async e => {
				// BUSCAR MODELO DE WORKDAY
				workday = await workdays.findByPk(e.fk_jornada_id);
				// BUSCAR MODELO
				marking = await markingModel.findByPk(e.marcacion_id);
				// ACTUALIZAR JORNADA DE TRABAJO
				marking.setWorkday(workday);
				// REGISTROS DE INGRESO Y SALIDA DEL SISTEMA
				ingresoSystem=new Date(e.marcacion_ingreso_sistema);
				salidaSystem=new Date(e.marcacion_salida_sistema);

				// VALIDAR ESTADO DE MARCACION
				if(e.marcacion_estado=='REGISTRO JUSTIFICADO'){
					// REGISTRO JUSTIFICADO DE MARCACIONES
					if(e.marcacion_ingreso == null) e.marcacion_ingreso=e.marcacion_ingreso_sistema;
					e.marcacion_salida=e.marcacion_salida_sistema;
				}
				
				// CALCULO DE INGRESOS Y SALIDAS
				ingreso=new Date(e.marcacion_ingreso);
				salida=new Date(e.marcacion_salida);
				// CALCULAR TIEMPO DE DIFERENCIA ENTRE TIMBRADAS 
				e.marcacion_ingreso_extras=((ingresoSystem.getTime()-ingreso.getTime()) / (1000 * 60));
				e.marcacion_salida_extras=((salida.getTime()-salidaSystem.getTime()) / (1000 * 60));
				// ACTUALIZAR DATOS DE BIOMETRICO
				return await marking.update(e);
			});

			Promise.all(promises).then(e => { console.log(e); });

			db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE');

		} catch (error) { db.setEmpty(res,'ACTUALIZAR LISTADO DE NO MARCACIONES DEL PERSONAL',false,error); }
               
    },
	
	/*
	 * ACTUALIZACIÓN DE MARCACIONES
	 */
    async deleteByPeriodoId(req, res){

        // ELIMINAR MARCACIONES
        await markingModel.destroy({ where: { fk_periodo_id: req.query.periodId } });

        // RETORNAR CONSULTA
        db.setEmpty(res,'MARCACIONES ELIMINADAS CARRECTAMENTE',true);
               
    }

};