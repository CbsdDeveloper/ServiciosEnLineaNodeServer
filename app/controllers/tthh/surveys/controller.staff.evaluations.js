'use strict';
const { dateFormat, now, format } = require('../../../config/parseDate');
const db = require('../../../models');

const testModel = db.surveysStaffEvaluations;
const answerMdl = db.surveysStaffEvaluationsAnswers;

module.exports ={
	
	// LISTADO DE SECCIONES Y PREGUNTAS DE UN FORMULARIO
	async insertSurveyEvaluarion(req, res){

		// DECLARACION DE VARIABLES
		let strWhr = {
			test_id: req.body.test_id,
			fk_evaluacion_id: req.body.fk_evaluacion_id
		};
		
		// TRANSACCION
		db.sequelize.transaction(async (t) => {

			// ENCONTRAR O CREAR EVALUACIÓN
			await testModel.update(
				{
					evaluado_fechaevaluacion: dateFormat(now, format.dateTime),
					test_estado: 'TEST REALIZADA',
					fk_personal_id: req.body.fk_personal_id,
					test_registro: dateFormat(now, format.dateTime)
				},
				{ where: strWhr }
			);

			// ELIMINAR RESPUESTAS ANTERIORES
			await answerMdl.destroy({ where: { fk_test_id: req.body.test_id } });

			// REGISTRAR PREGUNTAS Y RESPUESTAS DE TEST
			for(let [k, v] of Object.entries(req.body.test)){

				// VALIDAR SI HA SIDO CREADO
				v.fk_test_id = req.body.test_id;
				v.fk_pregunta_id = k;

				await answerMdl.create(v);

			}

		}).then(result => {
			db.setEmpty(res,'¡Evaluación registrada correctamente!',true,result);
		}).catch(err => {
			db.setEmpty(res,'¡Error en el proceso!',false,err); 
		});

	}

};