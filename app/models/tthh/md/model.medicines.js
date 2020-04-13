'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_medicamentos', {
		medicamento_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		medicamento_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		medicamento_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		fk_personal_id: { 
			type: DataTypes.INTEGER
		}, // integer not null references tthh.tb_personal(personal_id), -- 
		
		medicamento_codigo: { 
			type: DataTypes.STRING
		}, // text not null,
	
		medicamento_presentacion: { 
			type: DataTypes.STRING
		}, // text not null, -- UNIDAD, TABLETAS, FRASCO, AMPOLLA, FUNDA, COMPRIMIDO MASTICABLE, TUBO
		medicamento_nombre: { 
			type: DataTypes.STRING
		}, // text not null, -- 
		medicamento_generico: { 
			type: DataTypes.STRING
		}, // text -- 

		medicamento_dosis: {
			type: DataTypes.STRING
		}, // text -- 
		medicamento_via_administracion: { 
			type: DataTypes.STRING
		} // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}