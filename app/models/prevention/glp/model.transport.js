'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_transporteglp', {
		transporte_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		transporte_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		transporte_estado:{
			type: DataTypes.STRING
		}, // text default 'PENDIENTE'::text, -- INGRESADO, REVISION, APROBADO
		
		transporte_serie: { 
			type: DataTypes.INTEGER
		}, // int default 0, -- NUMERO DE PERMISO EMITIDO
		transporte_solicitud:{
			type: DataTypes.STRING
		}, // text, -- SOLICITUD CON LA QUE INGRESA EL TRAMITE
		
		transporte_observacion:{
			type: DataTypes.STRING
		}, // text, -- OBSERVACIONES
		transporte_codigo:{
			type: DataTypes.STRING
		}, // text, -- CODIGO DE PROYECTO
		transporte_aprobado:{
			type: DataTypes.STRING
		}, // timestamp without time zone default

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
};