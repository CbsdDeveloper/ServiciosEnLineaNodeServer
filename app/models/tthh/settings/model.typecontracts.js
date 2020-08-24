'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_tiposcontratos', {
		tcontrato_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		tcontrato_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		tcontrato_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		tcontrato_nombre: { 
			type: DataTypes.STRING
		}, // text not null, -- NOMBRE DE CONTRATO
		tcontrato_detalle: { 
			type: DataTypes.STRING 
		} // text, -- DETALLE
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}