'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_gruposocupacionales', {
		grupo_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		grupo_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		grupo_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		grupo_nombre: { 
			type: DataTypes.STRING 
		}, // text not null, -- TEMA DE ARTÍCULO
		grupo_grado: { 
			type: DataTypes.STRING 
		}, // text not null,
		grupo_salario_sri: { 
			type: DataTypes.DECIMAL(8,2),
			defaultValue: 0
		}, // numeric(8,2) not null,
		grupo_salario_interno: { 
			type: DataTypes.DECIMAL(8,2),
			defaultValue: 0
		} // numeric(8,2) default 0
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}