'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_biomertico_periodos', {
		periodo_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		periodo_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- 
		periodo_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'REVISION' 
		}, // text default 'CORRECTO'::text, -- CORRECTO, REVISION, ANULADO
		
		periodo_nombre: { 
			type: DataTypes.STRING
		}, // text not null,
		
		periodo_desde: { 
			type: DataTypes.DATE
		}, // date not null,
		periodo_hasta: { 
			type: DataTypes.DATE
		}, // date not null
		
		fk_registra: { 
			type: DataTypes.STRING
		}, // text not null,
		
		fk_aprueba: { 
			type: DataTypes.STRING
		} // text not null,
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}