'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const equipmentModel = db.tthh.vrescueEquipments;
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
					{ equipo_serial: { [Op.iLike]: '%' + filter + '%'} },
					{ equipo_marca: { [Op.iLike]: '%' + filter + '%'} },
					{ equipo_modelo: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await equipmentModel.findAndCountAll(
				{
					where: where,
					attributes: {
						include: [ 
							[ seq.literal("platoon.fk_estacion_id"), 'fk_estacion_id' ]
						]
					},
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
			db.setDataTable(res,{ rows, meta },'RESCATE VERTICAL - LISTADO DE EQUIPOS');
		} catch (error) {
			db.setEmpty(res,'RESCATE VERTICAL - LISTADO DE EQUIPOS',false,error);
		}

	},

	/*
	 * DETALLE DE EQUIPOS
	 */
	async detailById(req, res){
		try {

			// INFORMACION DE EQUIPO
			let equipment = await equipmentModel.findOne({
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
		
			// RETORNAR MENSAJE
			db.setEmpty(res,'DETALLE DE EQUIPOS DE RESCATE VETICAL',true,{ equipment });

		} catch (error) { db.setEmpty(res,'RESCATE VERTICAL - DETALLE DE EQUIPOS',false,error); }

	},

	/*
	 * OBTENER INFORMACION DE EQUIPO
	 */
	async formByEquipment(req, res){
		try {

			// INFORMACION DE EQUIPO
			let equipment = await equipmentModel.findOne({
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
			}),
			test = await {};

			// BUSCAR LISTADO DE PREGUNTAS
			formSectionsMdl.findAll({
				where: { fk_formulario_id: req.body.formId },
				include:[
					{
						model: formQuestionsMdl,
						as: 'questions',
						include: [
							{ model: resourceMdl, as: 'rating' }
						]
					}
				],
				order:[
					[ 'seccion_index', 'asc' ],
					[ { model: formQuestionsMdl, as: 'questions' }, 'pregunta_index', 'asc' ]
				]
			}).then(async(sectionsList) => {

				// RETORNAR MENSAJE
				db.setEmpty(res,'FORMULARIO PARA EVALUACIÓN DE EQUIPOS DE RESCATE VERTICAL',true,{equipment, test, sectionsList});

			}).catch(err => { res.status(500).json({msg: "error", details: err}); });

		} catch (error) { db.setEmpty(res,'RESCATE VERTICAL - LISTADO DE EQUIPOS',false,error); }

	}

}