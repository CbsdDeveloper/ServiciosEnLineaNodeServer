'use strict';
const db = require('../../../models');
const testModel = db.tthh.psychosocial.test;
const Answer = db.tthh.psychosocial.testAnswers;

module.exports ={
	
	// LISTADO DE SECCIONES Y PREGUNTAS DE UN FORMULARIO
	insertPsychosocialTest(req, res){

		// DECLARACION DE VARIABLES
		let strWhr = {
			fk_evaluacion_id: req.body.fk_evaluacion_id,
			fk_evaluado_id: req.body.fk_personal_id
		};

		// TRANSACCION
		db.sequelize.transaction((t) => {

			// ENCONTRAR O CREAR EVALUACIÓN
			testModel.findOrCreate({
				defaults: {
					fk_evaluacion_id: req.body.fk_evaluacion_id,
					fk_evaluado_id: req.body.fk_personal_id,
					fk_personal_id: req.body.fk_personal_id
				},
				where: strWhr
			}).then(async([test,created]) => {

				await Answer.destroy({ where: { fk_test_id: test.test_id } });

				// REGISTRAR PREGUNTAS Y RESPUESTAS DE TEST
				for(let [k, v] of Object.entries(req.body.test)){

					// VALIDAR SI HA SIDO CREADO
					v.fk_test_id = test.test_id;
					v.fk_pregunta_id = k;

					await Answer.create(v);

				}

			});

		}).then(result => {
			db.setEmpty(res,'¡Evaluación registrada correctamente!',true,result); 
		}).catch(err => {
			db.setEmpty(res,'¡Error en el proceso!',false,err); 
		});
		




		/*
		// CONSULTAR REGISTROS
		testModel.count({
			where: strWhr
		}).then(c => {
			// VALIDAR CONSULTA
			if( c > 0 ){
				db.setEmpty(res,'Usted ya ha rendido esta evaluación!');
			}else{

				// TRANSACCION
				db.sequelize.transaction((t) => {

					// ELIMINAR LISTADO DE BRIGADISTAS
					testModel.create({
						fk_evaluacion_id: req.body.fk_evaluacion_id,
						fk_evaluado_id: req.body.fk_personal_id,
						fk_personal_id: req.body.fk_personal_id
					}).then(async(test) => {
						
						await Answer.destroy({ where: { fk_test_id: test.test_id } });

						// REGISTRAR PREGUNTAS Y RESPUESTAS DE TEST
						for(let [k, v] of Object.entries(req.body.test)){

							// VALIDAR SI HA SIDO CREADO
							v.fk_test_id = test.test_id;
							v.fk_pregunta_id = k;

							await test.addAnswers(v);

						}

					});

				}).then(result => {
					db.setEmpty(res,'¡Evaluación registrada correctamente!',true,result); 
				}).catch(err => {
					db.setEmpty(res,'¡Error en el proceso!',false,err); 
				});
				
			}

		});
		*/


	}

};