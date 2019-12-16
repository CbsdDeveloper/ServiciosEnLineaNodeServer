'use strict';
const db = require('../../models');
const evaluationModel = db.psychosocialEvaluations;
const formsModel = db.psychosocialforms;
const sectionsModel = db.psychosocialformsSections;
const questionsModel = db.psychosocialformsQuestions;
const resourceModel = db.resources;
const evaluationQuestionsModel = db.psychosocialEvaluationsQuestions;
const testModel = db.psychosocialTest;

module.exports ={
	
	// DETALLE DE FORMULARIOS
	findById(req, res){
		evaluationModel.findByPk(req.body.entityId,{
			include: [
				{
					model: formsModel,
					as: 'form'
				}
			]
		}).then(data => {
			db.setEmpty(res,'INFORMACION DE ENTIDAD - EVALUACION DE FORMULARIO > ' + data.form.formulario_nombre,true,data);
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// LISTADO DE SECCIONES Y PREGUNTAS DE UN FORMULARIO
	questionsByEvaluation(req, res){
		
		evaluationModel.findByPk(req.body.evaluationId,{
			include: [
				{
					model: formsModel,
					as: 'form'
				}
			]
		}).then((evaluation) => {

			sectionsModel.findAll({
				
				where: { fk_formulario_id: evaluation.form.formulario_id },
				include:[
					{
						model: questionsModel,
						as: 'questions',
						include:[
							{
								model: resourceModel,
								as: 'question',
							}
						]
					}
				],
				order: [
					[ 'seccion_index' ]
				]
			}).then((sections) => {

				db.setEmpty(res,'INFORMACION DE ENTIDAD - EVALUACION DE FORMULARIO > ' + evaluation.form.formulario_nombre,true,sections);

			});

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// LISTADO DE SECCIONES Y PREGUNTAS DE UN FORMULARIO
	selectedQuestionsByEvaluation(req, res){
		
		evaluationQuestionsModel.findAll({
			where: { fk_evaluacion_id: req.body.evaluationId },
			attributes:['fk_pregunta_id']
		}).then((list) => {

			db.setEmpty(res,'LISTADO DE PREGUNTAS DE UNA EVALUACIÓN',true,list.map(function(d){ return d.fk_pregunta_id }));

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// LISTADO DE SECCIONES Y PREGUNTAS DE UN FORMULARIO
	questionnaireByEvaluation(req, res){
		// BUSCAR SI EL PERSONAL YA HA REALIZADO LA EVALUACION
		testModel.count({
			where: {
				fk_evaluacion_id: req.body.evaluationId,
				fk_evaluado_id: req.body.staffId
			}
		}).then(count => {
			if(count>0) db.setEmpty(res,'Lamentamos los inconvenientes, al parecer usted ya ha realizado esta evaluación.',false);
			else{
				// BUSCAR LISTADO DE PREGUNTAS
				evaluationQuestionsModel.findAll({
					where: { fk_evaluacion_id: req.body.evaluationId },
					include:[
						{
							model: questionsModel,
							as: 'question',
							include: [
								{ model: sectionsModel, as: 'section' },
								{ model: resourceModel, as: 'question' },
								{ model: resourceModel, as: 'ranking' }
							]
						}
					],
					order:[
						[ { model: questionsModel, as: 'question' }, { model: sectionsModel, as: 'section' }, 'seccion_index', 'asc' ],
						[ { model: questionsModel, as: 'question' }, 'pregunta_index', 'asc' ]
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
						v.question.ranking.recurso_descripcion=JSON.parse(v.question.ranking.recurso_descripcion);
						// INSERTAR DATO
						sectionsList[seccionName].questions.push(v);
					});

					db.setEmpty(res,'CUESIONARIO PARA EVALUACION DE RIESGO PSICOSOCIAL',true,sectionsList);

				}).catch(err => { res.status(500).json({msg: "error", details: err}); });
			}
		});

	},

	// REGISTRAR BRIGADISTAS
	setQuestionsForEvaluation(req, res){
		// TRANSACCION
		db.sequelize.transaction(async (t) => {
			
			// ELIMINAR LISTADO DE BRIGADISTAS
			await evaluationQuestionsModel.destroy({ where: { fk_evaluacion_id: req.body.evaluationId } });

			// RECORRER LISTADO 
			await req.body.selected.forEach(async (v) => {
				// INGRESAR LISTADO DE EMPLEADOS
				await evaluationQuestionsModel.create({ fk_pregunta_id: v, fk_evaluacion_id: req.body.evaluationId });
			});

		}).then(result => {
			db.setEmpty(res,'¡Datos actualizados correctamente!',true,result); 
		}).catch(err => {
			db.setEmpty(res,'¡Error en el proceso!',false,err); 
		});
	}

};