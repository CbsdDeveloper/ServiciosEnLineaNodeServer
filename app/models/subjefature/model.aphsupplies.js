'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('parte_has_insumos', {
		registro_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		insumo_cantidad: { 
			type: DataTypes.INTEGER
		} // text, -- CEDULA DE ATENDIDO
		
	}, {
		schema: 'subjefatura',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}