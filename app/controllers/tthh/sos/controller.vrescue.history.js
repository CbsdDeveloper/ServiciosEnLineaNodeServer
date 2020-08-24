'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const historyModel = db.tthh.vrescueHistory;
const historyAnswersMdl = db.tthh.vrescueHistoryAnswers;

const equipmentMdl = db.tthh.vrescueEquipments;
const categoryMdl = db.tthh.vrescueCategoriesequipments;

const platoonMdl = db.tthh.platoons;
const stationMdl = db.tthh.stations;
const staffMdl = db.tthh.staff;

const formMdl = db.resources.forms;
const formSectionsMdl = db.resources.formSections;
const formQuestionsMdl = db.resources.formQuestions;
const resourceMdl = db.resources.resources;

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
					{ registro_codigo: { [Op.iLike]: '%' + filter + '%'} },
					{ registro_condiciones_preuso: { [Op.iLike]: '%' + filter + '%'} },
					{ registro_condiciones_postuso: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await historyModel.findAndCountAll(
				{
					where: where,
					include: [
						{ 
							model: equipmentMdl, as: 'equipment',
							include: [
								{ 
									model: categoryMdl, as: 'category',
									attributes: [ 'categoria_nombre' ]
								}
							]
						},

						{ 
							model: formMdl, as: 'form',
							attributes: [ 'formulario_nombre' ]
						},
						{ 
							model: platoonMdl, as: 'platoon',
							attributes: [ 'peloton_nombre','fk_estacion_id' ],
							include: [
								{	
									model: stationMdl, as: 'station', 
									attributes: [ 'estacion_nombre','estacion_nombre_alterno' ] 
								}
							]
						},
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
			db.setDataTable(res,{ rows, meta },'RESCATE VERTICAL - HISTORIAL DE USO DE EQUIPOS');
		} catch (error) {
			db.setEmpty(res,'RESCATE VERTICAL - HISTORIAL DE USO DE EQUIPOS',false,error);
		}

	},

	/*
	 * HISTORIAL DE USO DE UN EQUIPOS
	 */
	async historyByEquipmentId(req, res){
		try {


			let data = await historyModel.findAll({
				where: { fk_equipo_id: req.body.equipmentId },
				include: [
					{ 
						model: formMdl, as: 'form',
						attributes: [ 'formulario_nombre' ]
					},
					{ 
						model: platoonMdl, as: 'platoon',
						attributes: [ 'peloton_nombre','fk_estacion_id' ],
						include: [
							{	
								model: stationMdl, as: 'station', 
								attributes: [ 'estacion_nombre','estacion_nombre_alterno' ] 
							}
						]
					},
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
				order: [ ['registro_codigo','DESC'] ]
			});

			db.setDataTable(res,data,'RESCATE VERTICAL - HISTORIAL DE USO DE EQUIPOS');


		} catch (error) { db.setEmpty(res,'RESCATE VERTICAL - HISTORIAL DE USO DE LOS EQUIPOS',false,error); }

	},

	/*
	 * OBTENER INFORMACION DE EQUIPO
	 */
	async formByHistoryId(req, res){
		try {
			
			let history = await historyModel.findOne({ where: { registro_id: req.body.entityId } }),
			test = await {};

			// INFORMACION DE EQUIPO
			let equipment = await equipmentMdl.findOne({
				where: { equipo_id: req.body.equipmentId },
				include: [
					{ 
						model: categoryMdl, as: 'category',
						attributes: [ 'categoria_nombre' ]
					},
					{ 
						model: formMdl, as: 'form',
						attributes: [ 'formulario_nombre' ]
					},
					{ 
						model: platoonMdl, as: 'platoon',
						attributes: [ 'peloton_nombre','fk_estacion_id' ],
						include: [
							{	
								model: stationMdl, as: 'station', 
								attributes: [ 'estacion_nombre','estacion_nombre_alterno' ] 
							}
						]
					}
				]
			});

			// BUSCAR LISTADO DE PREGUNTAS
			let sectionsList = await formSectionsMdl.findAll({
				where: { fk_formulario_id: req.body.formId },
				include:[
					{
						model: formQuestionsMdl,
						as: 'questions',
						include: [ { model: resourceMdl, as: 'rating' } ]
					}
				],
				order:[
					[ 'seccion_index', 'asc' ],
					[ { model: formQuestionsMdl, as: 'questions' }, 'pregunta_index', 'asc' ]
				]
			});

			// LISTAR LAS RESPUESTAS DEL FORMULARIO
			historyAnswersMdl.findAll({ 
				where: { fk_registro_id: req.body.entityId } 
			}).then(async(data) => {

				data.forEach((v,k)=>{ test[v.fk_pregunta_id] = v; });

				// RETORNAR MENSAJE
				db.setEmpty(res,'CUESIONARIO PARA EVALUACIONES DE TTHH',true,{history, test, equipment, sectionsList});
				
			});

		} catch (error) { db.setEmpty(res,'RESCATE VERTICAL - LISTADO DE EQUIPOS',false,error); }

	}

}