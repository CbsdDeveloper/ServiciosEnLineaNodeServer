module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_perfiles', {
		perfil_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		perfil_nombre: Sequelize.STRING,
		perfil_descripcion: Sequelize.STRING,
		perfil_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		},
		fk_usuario_id:{
			type: Sequelize.INTEGER
		}
	}, {
		schema: 'admin',
		underscored: true,
		timestamps: false
	});
	
	return Model;
}