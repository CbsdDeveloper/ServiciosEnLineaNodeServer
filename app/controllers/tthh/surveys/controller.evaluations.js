'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const evaluationModel = db.tthh.surveysEvaluations;

const evaluationStaffMdl = db.tthh.surveysStaffEvaluations;

const formMdl = db.resources.forms;
const formSectionsMdl = db.resources.formSections;
const formQuestionsMdl = db.resources.formQuestions;
const resourceMdl = db.resources.resources;

const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;

module.exports ={

	/*
	 * INFORMACION DE EVALUACION
	 */
	async findById(req, res){

		// INFORMACION DE EVALUACION
		let entity = await evaluationModel.findOne({
			where: {
				evaluacion_id: req.body.id
			},
			include: [
				{
					model: formMdl, as: 'form' 
				},
				{
					model: evaluationStaffMdl, as: 'evaluations',
					required: false,
					attributes: [ 'test_id','test_estado','evaluado_fechaevaluacion','evaluado_fechainscripcion','evaluado_correo','evaluado_telefonos','evaluado_edad','evaluado_cargo' ],
					include: [
						{
							model: staffMdl, as: 'staff',
							attributes: [ 'personal_id','personal_correo_institucional' ],
							include: [
								{
									model: personMdl, as: 'person', 
									attributes: [ 'persona_apellidos','persona_nombres','persona_imagen' ]
								}
							]
						}
					]
				}
			],
			order: [ 
				[ 
					{ model: evaluationStaffMdl, as: 'evaluations' }, 'evaluado_fechainscripcion','DESC' 
				] 
			]
		});

		var filterParams = { 
			replacements: req.body, 
			type: seq.QueryTypes.SELECT
		};
		let alerts = await seq.query("SELECT * FROM tthh.vw_evaluacionpersonal_alerta WHERE fk_evaluacion_id = :id ORDER BY evaluado_fechainscripcion DESC", filterParams).catch(error => { throw error});

		// RETORNAR MENSAJE
		db.setEmpty(res,'INFORMACION DE EVALUACIONE PARA PERSONAL',true, { entity, alerts } );
		
	},
	
	/*
	 * LISTADO DE SECCIONES Y PREGUNTAS DE UN FORMULARIO
	 */
	async questionnaireByEvaluation(req, res, next){

		// VALIDAR ESTADO DE EVALUACION DEL PERSONAL
		let test = await evaluationStaffMdl.findByPk(req.body.testId);
		if(test.test_estado=='TEST REALIZADA') db.endConection(res,next,'¡Lo sentimos, esta evaluación solo se puede realizar una vez!',false);
		
		// INFORMACION DE EVALUACION E FORMULARIO
		let evaluation = await evaluationModel.findOne({
			where: {
				evaluacion_id: req.body.evaluationId
			},
			include: [
				{ model: formMdl, as: 'form' }
			]
		});

		// BUSCAR LISTADO DE PREGUNTAS
		formSectionsMdl.findAll({
			where: { fk_formulario_id: evaluation.fk_formulario_id },
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
			db.setEmpty(res,'CUESIONARIO PARA EVALUACIONES DE TTHH',true,{evaluation, sectionsList});

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });

	},

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
			const { rows, count } = await evaluationModel.findAndCountAll(
				{
					include: [
						{ 
							model: formMdl, as: 'form' 
						},
						{ 
							model: staffMdl, as: 'staff', 
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
			db.setDataTable(res,{ rows, meta },'LISTADO DE EVALUACIONES');
		} catch (error) {
			db.setEmpty(res,'LISTADO DE EVALUACIONES',false,error);
		}

	}

};