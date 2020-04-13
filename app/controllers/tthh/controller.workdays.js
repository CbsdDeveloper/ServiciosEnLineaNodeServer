'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const workdaysModel = db.workdays;
const scheduleworkdays = db.scheduleworkdays;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'jornada_nombre' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				jornada_nombre: seq.where(seq.fn('LOWER', seq.col('jornada_nombre')), 'LIKE', '%' + filter + '%')
			};
			const { rows, count } = await workdaysModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'JORNADAS DE TRABAJO');
		} catch (error) {
			db.setEmpty(res,'JORNADAS DE TRABAJO',false,error);
		}

	},

	/*
	 * ACTUALIZACIÓN DE MODELOS
	 */
	async updateEntity(req, res){
		try {
			// ACTUALIZAR DATOS DE MODELO
			req.body.jornada_registro = db.getCurrentDate();
			// OBTENER REGISTRO
			let workday = await workdaysModel.findByPk(req.body.jornada_id), schedule;
			// ACTUALIZAR MODELO
			await workday.update(req.body);

			// REGISTRO DE HORARIOS
			req.body.schedules.forEach(async e => {
				
				// BUSCAR HORARIO
				schedule = await scheduleworkdays.findByPk(e.horario_id);
				// CAMBIAR MODELO
				e.horario_dias_semana = JSON.stringify(e.horario_dias_semana);
				// ACTUALIZAR REGISTRO
				await schedule.update(e);

			});
			
			// RETORNAR CONSULTA
			db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE',true,workday);
			
		} catch (error) {
			db.setEmpty(res,'ERROR EN MODELO',false,error);
		}
	},

	// INFORMACION DE JORNADA 
	findByIdDetail(req, res){
		workdaysModel.findOne({
			where: {
				jornada_id: req.body.entityId
			},
			include: {
				model: scheduleworkdays,
				as: 'schedules'
			}
		}).then(data => {
			db.setJSON(res,data,'INFORMACION DE JORNADAS DE TRABAJO');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// FETCH All Customers
	findAll(req, res){
		workdaysModel.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE JORNADAS DE TRABAJO');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}

};