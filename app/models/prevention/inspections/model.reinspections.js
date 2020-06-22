'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_reinspecciones', {
		reinspeccion_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		reinspeccion_estado:{
			type: DataTypes.STRING
		}, // text, -- REPLICAR EL ESTADO DE INSPECCION
		reinspeccion_registro:{
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0), -- REPLICAR EL ESTADO DE INSPECCION
		
		reinspeccion_informe_numero:{
			type: DataTypes.STRING
		}, // text, -- INSPECCION DE INSPECCION
		reinspeccion_fecha:{
			type: DataTypes.DATE
		}, // date, -- FEHCA PARA PROXIMA INSPECCION
		
		reinspeccion_hora_ingreso:{
			type: DataTypes.DATE
		}, // timestamp without time zone, -- HORA APROXIMADA QUE INICIA LA INSPECCION
		reinspeccion_hora_salida:{
			type: DataTypes.DATE
		}, // timestamp without time zone, -- HORA APROXIMADA QUE FINALIZA LA INSPECCION
		

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}