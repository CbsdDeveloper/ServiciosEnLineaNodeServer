'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_procedimientoscontratacion', {
		procedimiento_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		procedimiento_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		procedimiento_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		procedimiento_contratacion:{
			type: Sequelize.STRING
		}, //  text, -- CATALOGO ELECTRONICO, INFIMA CUANTIA, SUBASTA INVERSA ELECTRONICA, ...
		
		procedimiento_tipo_contratacion:{
			type: Sequelize.STRING
		}, //  text, -- BIENES, SERVICIOS, BIENES Y SERVICIOS, OBRAS, CONSULTORIAS, FERIAS INLUSIVAS
		procedimiento_normalizado: {
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, //  text default 'NO'::text, -- SI, NO, NA
		
		procedimiento_monto_minimo: {
			type: Sequelize.DECIMAL(10,2)
		}, //  numeric(10,2) default 0, -- 
		procedimiento_monto_maximo: {
			type: Sequelize.DECIMAL(10,2)
		} //  numeric(10,2) -- 

	}, {
		schema: 'recaudacion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}