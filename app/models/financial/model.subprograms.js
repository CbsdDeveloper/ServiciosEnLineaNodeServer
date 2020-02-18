'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_subprogramasfinancieros', {
		subprograma_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		subprograma_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		subprograma_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		subprograma_codigo:{
			type: Sequelize.STRING
		}, // text, -- 
		subprograma_descripcion:{
			type: Sequelize.STRING
		} // text -- 

	}, {
		schema: 'financiero',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}