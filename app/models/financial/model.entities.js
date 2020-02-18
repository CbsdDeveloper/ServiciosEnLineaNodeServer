'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_entidadesfinancieras', {
		entidad_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		entidad_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		entidad_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		entidad_nombre:{
			type: Sequelize.STRING
		}, // text, -- 
		entidad_cuenta_bce:{
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