'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const orderModel = db.administrative.maintenances.order;

const annexeMdl = db.administrative.maintenances.annexxe;
const performedMdl = db.administrative.maintenances.performed;
const suggestedMdl = db.administrative.maintenances.suggested;
const paymentMdl = db.administrative.maintenances.payment;

const unitMdl = db.administrative.units.unit;

const galleryMdl = db.resources.gallery;

const ppersonalMdl = db.tthh.ppersonal;
const staffMdl = db.tthh.staff;
const jobMdl = db.tthh.jobs;
const leadershipMdl = db.tthh.leaderships;
const personMdl = db.resources.persons;

const userMdl = db.admin.users;

module.exports = {

	/*
	 * DETALLE DEL REGISTRO
	 */
	async detailEntityById(req, res){

		try {

			// INFORMACION DE ENTIDAD
			let maintenance = await orderModel.findOne({
				where: { 
					orden_id: req.body.entityId 
				},
				include: [
					{
						model: unitMdl, as: 'unit'
					},
					{
						model: ppersonalMdl, as: 'gservices',
						attributes: [ 'ppersonal_id' ],
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: [ 'personal_id','personal_correo_institucional' ],
								include: [{
									model: personMdl, as: 'person',
									attributes: ['persona_nombres','persona_apellidos','persona_imagen','persona_doc_identidad']
								}]
							},
							{
								model: jobMdl, as: 'job',
								attributes: [ 'puesto_id','puesto_nombre' ],
								include: [{
									model: leadershipMdl, as: 'leadership',
									attributes: ['direccion_id','direccion_nombre']
								}]
							}
						]
					},
					{
						model: ppersonalMdl, as: 'administrative',
						attributes: [ 'ppersonal_id' ],
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: [ 'personal_id','personal_correo_institucional' ],
								include: [{
									model: personMdl, as: 'person',
									attributes: ['persona_nombres','persona_apellidos','persona_imagen','persona_doc_identidad']
								}]
							},
							{
								model: jobMdl, as: 'job',
								attributes: [ 'puesto_id','puesto_nombre' ],
								include: [{
									model: leadershipMdl, as: 'leadership',
									attributes: ['direccion_id','direccion_nombre']
								}]
							}
						]
					},
					{
						model: ppersonalMdl, as: 'requested',
						attributes: [ 'ppersonal_id' ],
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: [ 'personal_id','personal_correo_institucional' ],
								include: [{
									model: personMdl, as: 'person',
									attributes: ['persona_nombres','persona_apellidos','persona_imagen','persona_doc_identidad']
								}]
							},
							{
								model: jobMdl, as: 'job',
								attributes: [ 'puesto_id','puesto_nombre' ],
								include: [{
									model: leadershipMdl, as: 'leadership',
									attributes: ['direccion_id','direccion_nombre']
								}]
							}
						]
					},

					{
						model: annexeMdl, as: 'annexxes',
						include: [
							{
								model: userMdl, as: 'user',
								attributes: [ ['usuario_login','usuario'] ]
							}
						]
					},
					{
						model: performedMdl, as: 'performed',
						include: [
							{
								model: userMdl, as: 'user',
								attributes: [ ['usuario_login','usuario'] ]
							}
						]
					},
					{
						model: suggestedMdl, as: 'suggested',
						include: [
							{
								model: userMdl, as: 'user',
								attributes: [ ['usuario_login','usuario'] ]
							}
						]
					},
					{
						model: paymentMdl, as: 'payments',
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: [ 'personal_id','personal_correo_institucional' ],
								include: [{
									model: personMdl, as: 'person',
									attributes: ['persona_nombres','persona_apellidos']
								}]
							}
						]
					},

					{
						model: userMdl, as: 'user',
						attributes: [ ['usuario_login','usuario'] ]
					}
				]
			});

			let gallery = await galleryMdl.findAll({
				where: {
					fk_table: 'ordenesmantenimiento',
					fk_id: req.body.entityId 
				},
				include: [
					{
						model: userMdl, as: 'user',
						attributes: [ ['usuario_login','usuario'] ],
						include: [
							{
								model: personMdl, as: 'person',
								attributes: [ 'persona_imagen' ]
							}
						]
					}
				]
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Detalles de mantenimiento!',true,{maintenance, gallery});

		} catch (error) {
			db.setEmpty(res,'SERVICIOS GENERALES - MANTENIMIENTO DE HERRAMIENTAS MENORES - DETALLE',false,error);
		}

	},

};