'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_perfiles', {
		perfil_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		perfil_nombre: DataTypes.STRING,
		perfil_descripcion: DataTypes.STRING,
		perfil_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		},
		fk_usuario_id:{
			type: DataTypes.INTEGER
		}
	}, {
		schema: 'admin',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}