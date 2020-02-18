'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_catalogogeneralcuentas', {
		cuenta_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		cuenta_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		cuenta_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		cuenta_codigo:{
			type: Sequelize.STRING
		}, // text, -- 
		cuenta_descripcion:{
			type: Sequelize.STRING
		}, // text, -- 
		cuenta_nivel:{
			type: Sequelize.INTEGER
		}, // int default 1, -- 
		cuenta_movimiento:{
			type: Sequelize.INTEGER
		}, // int default 1, -- 
		cuenta_ppcredito:{
			type: Sequelize.STRING
		}, // text, -- 
		cuenta_ppdebito:{
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