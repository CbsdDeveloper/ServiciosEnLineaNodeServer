'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_formulariosriesgopsicosocial', {
		formulario_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		formulario_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		formulario_estado: { 
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		formulario_nombre: { 
			type: DataType.STRING 
		} // text not null, -- NOMBRE DE PUESTO
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}