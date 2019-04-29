'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_planesemergencia', {
		plan_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		plan_codigo:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		plan_registro: { 
			type: Sequelize.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		plan_estado:{
			type: Sequelize.STRING,
			defaultValue: 'PENDIENTE'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		plan_serie: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_solicitud:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		plan_elaborado: { 
			type: Sequelize.DATE
		}, // date,
		plan_caduca: { 
			type: Sequelize.DATE
		}, // date,
		plan_aprobado: { 
			type: Sequelize.DATE
		}, // timestamp without time zone,
		fk_inspector_id: { 
			type: Sequelize.INTEGER
		}, // integer,
		plan_observacion:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		plan_area: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric(10,2) NOT NULL DEFAULT 0,
		plan_aforo: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_plantas: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_clavecatastral:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",


		// 4. EVALUACION DE FACTORES DE RIESGOS DETECTADOS
		meseri_valor_x: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		meseri_valor_y: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		meseri_valor_p: { 
			type: Sequelize.DECIMAL(6,2),
			defaultValue: 0
		}, // numeric(6,2) default 0, -- 
		
		// 7. PROTOCOLO DE ALARMA Y COMUNICACIONES PARA EMERGENCIAS
		alarma_deteccion:{
			type: Sequelize.STRING
		}, // text, -- 
		alarma_aplicacion:{
			type: Sequelize.STRING
		}, // text, -- 
		alarma_aplicacion_anexo:{
			type: Sequelize.STRING
		}, // text, -- 
		alarma_grado_i:{
			type: Sequelize.STRING
		}, // text, -- 
		alarma_grado_ii:{
			type: Sequelize.STRING
		}, // text, -- 
		alarma_grado_iii:{
			type: Sequelize.STRING
		}, // text, -- 
		alarma_otros:{
			type: Sequelize.STRING
		}, // text, -- 
		
		// 8. PROTOCOLOS DE INTERVENCIÓN ANTE EMERGENCIAS
		intervencion_organigrama:{
			type: Sequelize.STRING
		}, // text, -- 
		intervencion_organigrama_anexo:{
			type: Sequelize.STRING
		}, // text, -- 
		intervencion_brigadas:{
			type: Sequelize.STRING
		}, // text, -- 
		intervencion_brigadas_anexo:{
			type: Sequelize.STRING
		}, // text, -- 
		intervencion_coordinacioninterinstitucional:{
			type: Sequelize.STRING
		}, // text, -- 
		intervencion_coordinacioninterinstitucional_anexo:{
			type: Sequelize.STRING
		}, // text, -- 
		intervencion_actuacion_durante_emergencia:{
			type: Sequelize.STRING
		}, // text, -- 
		intervencion_actuacion_especial:{
			type: Sequelize.STRING
		}, // text, -- 
		intervencion_actuacion_rehabilitacion:{
			type: Sequelize.STRING
		}, // text, -- 
		
		// 9. EVACUACIÓN
		evacuacion_decisiones:{
			type: Sequelize.STRING
		}, // text, -- 
		evacuacion_salidas_emergencia:{
			type: Sequelize.STRING
		}, // text, -- 
		evacuacion_procedimientos:{
			type: Sequelize.STRING
		}, // text, -- 
		
		// 10. PROCEDIMIENTOS PARA LA IMPLANTACIÓN DEL PLAN DE EMERGENCIA
		procedimiento_senializacion:{
			type: Sequelize.STRING
		}, // text, -- 
		procedimiento_cartelesinformativos:{
			type: Sequelize.STRING
		}, // text, -- 
		procedimiento_capacitaciones:{
			type: Sequelize.STRING
		}, // text, -- 
		procedimiento_simulacros:{
			type: Sequelize.STRING
		}, // text, -- 
		procedimiento_capacitaciones_anexo:{
			type: Sequelize.STRING
		}, // text, -- 

		// 11.	FIRMAS DE RESPONSABILIDAD Y SELLOS
		
		// OTROS DATOS
		plan_fecha_registro: { 
			type: Sequelize.DATE
		}, // FECHA DE REGISTRO
		plan_ciudad: { 
			type: Sequelize.STRING,
			defaultValue: 'Santo Domingo - Ecuador'
		} // CIUDAD DE ELABORACION

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}