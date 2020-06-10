'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const evaluationModel = db.surveysEvaluations;
const evaluationQuestionsMdl = db.surveysEvaluationsQuestions;

const formMdl = db.rsc.forms;
const formSectionsMdl = db.rsc.formSections;
const formQuestionsMdl = db.rsc.formQuestions;
const resourceMdl = db.resources;

module.exports ={
	
	// LISTADO DE SECCIONES Y PREGUNTAS DE UN FORMULARIO
	questionnaireByEvaluation(req, res){
		
		// BUSCAR LISTADO DE PREGUNTAS
		evaluationQuestionsMdl.findAll({
			where: { fk_evaluacion_id: req.body.evaluationId },
			include:[
				{
					model: formQuestionsMdl,
					as: 'question',
					include: [
						{ model: formSectionsMdl, as: 'section' },
						{ model: resourceMdl, as: 'src' },
						{ model: resourceMdl, as: 'rating' }
					]
				}
			],
			order:[
				[ { model: formQuestionsMdl, as: 'question' }, { model: formSectionsMdl, as: 'section' }, 'seccion_index', 'asc' ],
				[ { model: formQuestionsMdl, as: 'question' }, 'pregunta_index', 'asc' ]
			]
		}).then(async(list) => {

			let sectionsList = await { };
			let seccionName;

			list.forEach((v) => {
				// NOMBRE DE SECCION
				seccionName = v.question.section.seccion_nombre;
				// INGRESAR LISTADO DE EMPLEADOS
				if(!sectionsList[seccionName]){
					sectionsList[seccionName] = {
						section: v.question.section,
						questions: []
					};
				}
				// PARSE RANKING
				v.question.rating.recurso_descripcion=JSON.parse(v.question.rating.recurso_descripcion);
				// INSERTAR DATO
				sectionsList[seccionName].questions.push(v);
			});

			// INFORMACION DE FORMULARIO
			let evaluation = await evaluationModel.findOne({
				where: {
					evaluacion_id: req.body.evaluationId
				},
				include: [
					{
						model: formMdl, as: 'form'
					}
				]
			});


			// RETORNAR MENSAJE
			db.setEmpty(res,'CUESIONARIO PARA EVALUACIONES DE TTHH',true,{sectionsList, evaluation});

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
					include: [{ all: true }],
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