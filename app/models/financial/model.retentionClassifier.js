'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_clasificadorretenciones', {
		clasificador_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		clasificador_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		clasificador_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		clasificador_codigo:{
			type: Sequelize.STRING
		}, // text, -- 
		clasificador_codigo_formulario:{
			type: Sequelize.STRING
		}, // text, -- 
		clasificador_descripcion:{
			type: Sequelize.STRING
		}, // text -- 
		clasificador_procentaje:{
			type: Sequelize.DECIMAL(7,4),
			defaultValue: 0
		} // numeric(7,4) default 0, -- 
		
	}, {
		schema: 'financiero',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}