'use strict';
module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define('tb_licenciasdeconducir', {
		licencia_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		licencia_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		
		licencia_tipo:{
			type: DataTypes.STRING
		}, // text not null default 'cedula'::text, -- doocumento de identificación
		licencia_categoria:{
			type: DataTypes.STRING
		}, // text not null, -- doocumento de identificación
		licencia_descripcion:{
			type: DataTypes.STRING
		} // text not null, -- nombres de la persona

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return model;
}