'use strict';
module.exports = (sequelize, DataTypes) => {
	
	// DEFINIR MODELO
	const Employee = sequelize.define('tb_local_empleados', {
		empleado_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		empleado_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		empleado_funcion:{
			type: DataTypes.STRING
		} // 

	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true,

		classMethods:{
			associate:function(models){
				Employee.hasMany(models.persons);
			}
		}

	});
	
	return Employee;
}