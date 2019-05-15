'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_local_empleados', {
		empleado_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		empleado_estado:{
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		empleado_funcion:{
			type: Sequelize.STRING
		} // 

	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}