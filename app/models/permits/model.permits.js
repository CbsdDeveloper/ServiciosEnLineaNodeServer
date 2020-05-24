'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_permisos', {
		permiso_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		permiso_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		permiso_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		
		numero_solicitud:{
			type: DataTypes.STRING
		}, // text not null, -- NUMERO DE SOLICITUD DE TRAMITE
		codigo_per:{
			type: DataTypes.STRING
		}, // text NOT NULL, -- CODIGO DE PERMISO
		permiso_fecha:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0), -- FECHA QUE SE ENTREGA EL PERMISO

		persona_responsable:{
			type: DataTypes.STRING
		}, // text default 'PRIPIETARIO'::text, -- PERSONA QUE RETIRA
		persona_retira:{
			type: DataTypes.STRING
		}, // text, -- NOMBRE DE LA PERSONA QUE RETIRA
		observacion:{
			type: DataTypes.STRING
		}, // text, -- DETALLE DE PERMISO
		permiso_numero:{
			type: DataTypes.STRING
		} // text -- NUMERO DE PERMISO - FORMULARIO

	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}