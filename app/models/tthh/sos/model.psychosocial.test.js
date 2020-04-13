'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_testriesgopsicosocial', {
		test_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		test_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		test_estado: {
			type: DataType.STRING,
			defaultValue: 'TEST REALIZADA' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		fk_personal_id: {
			type: DataType.INTEGER
		}
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}