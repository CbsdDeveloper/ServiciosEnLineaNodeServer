'use strict';
const db = require('../../../models');

const evaluationModel = db.surveysEvaluations;
const evaluationQuestionsMdl = db.surveysEvaluationsQuestions;
const staffEvaluationMdl = db.surveysStaffEvaluations;
const staffAnswerMdl = db.surveysStaffEvaluationsAnswers;

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

			db.setEmpty(res,'CUESIONARIO PARA EVALUACIONES DE TTHH',true,sectionsList);

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });

	}

};