'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_tipoacciones', {
		tipoaccion_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		tipoaccion_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		tipoaccion_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		tipoaccion_codigo: { 
			type: DataTypes.STRING 
		}, // text not null, -- TEMA DE ARTÍCULO
		tipoaccion_nombre: { 
			type: DataTypes.STRING 
		}, // text not null, -- TEMA DE ARTÍCULO
		tipoaccion_descripcion: { 
			type: DataTypes.STRING
		}, // text -- DESCRIPCIÓN DE ARTÍCULO
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}