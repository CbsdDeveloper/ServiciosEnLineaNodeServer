'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_actividadesfinancieras', {
		actividad_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		actividad_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		actividad_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		actividad_codigo:{
			type: Sequelize.STRING
		}, // text, -- 
		actividad_descripcion:{
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