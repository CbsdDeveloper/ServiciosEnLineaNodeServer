'use strict';
module.exports = (sequelize, DataTypes) => {
	const Person = sequelize.define('tb_vehiculos', {
		vehiculo_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		vehiculo_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		vehiculo_estado:{
			type: DataTypes.STRING
		}, // timestamp without time zone default current_timestamp(0),
		
		vehiculo_fingreso:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		vehiculo_placa:{
			type: DataTypes.STRING
		}, // text NOT NULL,
		
		vehiculo_anio_matricula:{
			type: DataTypes.INTEGER
		}, // int, -- LISTADO JSON
		vehiculo_marca:{
			type: DataTypes.STRING
		}, // text not null, -- LISTADO JSON
		vehiculo_modelo:{
			type: DataTypes.STRING
		}, // text,	
		vehiculo_tipo:{
			type: DataTypes.STRING
		}, // text DEFAULT 'CAMION'::text, -- LISTADO JSON
		
		vehiculo_chasis:{
			type: DataTypes.STRING
		}, // text,
		vehiculo_motor:{
			type: DataTypes.STRING
		}, // text,
		vehiculo_combustible:{
			type: DataTypes.STRING
		}, // text default 'DIESEL'::text,
		vehiculo_avaluo: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(10,2),
		
		vehiculo_anio:{
			type: DataTypes.INTEGER
		}, // int,	
		vehiculo_pais:{
			type: DataTypes.STRING
		}, // text,	-- LISTADO JSON
		
		vehiculo_corroceria:{
			type: DataTypes.STRING
		}, // text, -- LISTADO JSON -> METALICA
		vehiculo_pasajeros:{
			type: DataTypes.INTEGER
		}, // int,
		vehiculo_cilindraje: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(6,2),
		vehiculo_toneladas: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(6,2),
		vehiculo_color1:{
			type: DataTypes.STRING
		}, // text,
		vehiculo_color2:{
			type: DataTypes.STRING
		}, // text,
		vehiculo_direccion:{
			type: DataTypes.STRING
		}, // text,
		
		vehiculo_proposito:{
			type: DataTypes.STRING
		}, // text DEFAULT 'PARTICULAR'::text, -- COMERCIAL, PARTICULAR, GUBERNAMENTAL, MUNICIPIO

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Person;
}