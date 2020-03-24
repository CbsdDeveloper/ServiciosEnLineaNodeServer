'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_planesemergencia', {
		plan_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		plan_codigo:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default",
		plan_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		plan_estado:{
			type: DataTypes.STRING,
			defaultValue: 'PENDIENTE'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		plan_serie: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_solicitud:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default",
		plan_elaborado: { 
			type: DataTypes.DATE
		}, // date,
		plan_caduca: { 
			type: DataTypes.DATE
		}, // date,
		plan_aprobado: { 
			type: DataTypes.DATE
		}, // timestamp without time zone,
		fk_inspector_id: { 
			type: DataTypes.INTEGER
		}, // integer,
		plan_observacion:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default",
		plan_area: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(10,2) NOT NULL DEFAULT 0,
		plan_aforo: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_plantas: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_clavecatastral:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default",

		// 4. EVALUACION DE FACTORES DE RIESGOS DETECTADOS
		meseri_valor_x: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		meseri_valor_y: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		meseri_valor_p: { 
			type: DataTypes.DECIMAL(6,2),
			defaultValue: 0
		}, // numeric(6,2) default 0, -- 
		meseri_observaciones:{
			type: DataTypes.STRING
		}, //
		meseri_observaciones_revision:{
			type: DataTypes.STRING
		}, //

		
		// 5. PREVENCIÓN Y CONTROL DE RIESGOS
		prevencion_proximo_mantenimiento:{
			type: DataTypes.STRING
		}, // 


		// 6. PLAN DE AUTOPROTECCION - MANTENIMIENTO
		
		// 7. PROTOCOLO DE ALARMA Y COMUNICACIONES PARA EMERGENCIAS
		alarma_deteccion:{
			type: DataTypes.STRING,
			defaultValue: 'DETECCIÓN AUTOMÁTICA'
		}, // text, -- 
		alarma_aplicacion:{
			type: DataTypes.STRING
		}, // text, -- 
		alarma_aplicacion_anexo:{
			type: DataTypes.STRING
		}, // text, -- 
		alarma_grado_i:{
			type: DataTypes.STRING,
			defaultValue: 'Determinada cuando se ha detectado un fuego en sus orígenes o cualquier otra emergencia de pequeñas magnitudes.\n'+
			'En esta etapa actuará la Unidad de Contraincendios para controlar el evento y evitar que la situación pase a Grado II.\n'+
			'La evacuación en este punto no es necesaria siempre y cuando se asegure la eficacia para el control del siniestro.'
		}, // text, -- 
		alarma_grado_ii:{
			type: DataTypes.STRING,
			defaultValue: 'Determinada cuando se ha detectado un incendio o evento adverso de medianas proporciones.\n'+
			'En esta etapa procederán las Unidad Contra incendios para controlar el evento y evitar que la situación pase a Grado III; además se asegurará la presencia de los respectivos organismos de socorro (Bomberos, Paramédicos o Policía).\n'+
			'Se aplicará la evacuación del personal de manera parcial de las áreas más afectadas, pero si se considera el avance del fuego ir directamente a una evacuación total.'
		}, // text, -- 
		alarma_grado_iii:{
			type: DataTypes.STRING,
			defaultValue: 'Determinada cuando el incendio o evento adverso es de grandes proporciones. Se considera también en este punto los eventos generados por movimientos sísmicos.\n'+
			'En esta etapa procederán los respectivos organismos de socorro, quienes controlarán la situación, mientras que todo el personal e inclusive las unidades evacuarán de manera total las instalaciones'
		}, // text, -- 
		alarma_otros:{
			type: DataTypes.STRING
		}, // text, -- 
		alarma_comunicacion_internos:{
			type: DataTypes.STRING,
			defaultValue: 'DETECCIÓN AUTOMÁTICA'
		}, //
		alarma_comunicacion_externos:{
			type: DataTypes.STRING,
			defaultValue: 'DETECCIÓN AUTOMÁTICA'
		}, //
		alarma_aplicacion_tipo:{
			type: DataTypes.STRING
		}, //
		
		// 8. PROTOCOLOS DE INTERVENCIÓN ANTE EMERGENCIAS
		intervencion_organigrama:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_organigrama_anexo:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_brigadas:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_brigadas_anexo:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_coordinacioninterinstitucional:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_coordinacioninterinstitucional_anexo:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_actuacion_durante_emergencia:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_actuacion_especial:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_actuacion_rehabilitacion:{
			type: DataTypes.STRING
		}, // text, -- 
		intervencion_zonaseguridad:{
			type: DataTypes.STRING
		}, // text; -- 
		intervencion_viasevacuacion:{
			type: DataTypes.STRING
		}, // text; --  
		intervencion_puntoencuentro:{
			type: DataTypes.STRING
		}, // text; -- 
		
		// 9. EVACUACIÓN
		evacuacion_decisiones:{
			type: DataTypes.STRING
		}, // text, -- 
		evacuacion_salidas_emergencia:{
			type: DataTypes.STRING
		}, // text, -- 
		evacuacion_procedimientos:{
			type: DataTypes.STRING
		}, // text, -- 
		
		// 10. PROCEDIMIENTOS PARA LA IMPLANTACIÓN DEL PLAN DE EMERGENCIA
		procedimiento_senializacion:{
			type: DataTypes.STRING
		}, // text, -- 
		procedimiento_cartelesinformativos:{
			type: DataTypes.STRING
		}, // text, -- 
		procedimiento_capacitaciones:{
			type: DataTypes.STRING
		}, // text, -- 
		procedimiento_simulacros:{
			type: DataTypes.STRING
		}, // text, -- 
		procedimiento_capacitaciones_anexo:{
			type: DataTypes.STRING
		}, // text, -- 

		// 11.	FIRMAS DE RESPONSABILIDAD Y SELLOS
		plan_sos: {
			type: DataTypes.STRING,
			defaultValue: 'REPRESENTANTE LEGAL'
		}, // text default 'REPRESENTANTE LEGAL'::text
		
		// OTROS DATOS
		plan_fecha_registro: { 
			type: DataTypes.DATE
		}, // FECHA DE REGISTRO
		plan_ciudad: { 
			type: DataTypes.STRING,
			defaultValue: 'Santo Domingo - Ecuador'
		}, // CIUDAD DE ELABORACION

		plan_responsable_tramite: { 
			type: DataTypes.STRING,
			defaultValue: 'REPRESENTANTE LEGAL'
		} //

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}