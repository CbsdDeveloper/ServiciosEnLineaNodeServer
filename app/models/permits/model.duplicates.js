'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_duplicados', {
		duplicado_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		// fk_permiso_id INT NOT NULL REFERENCES permisos.tb_permisos(permiso_id), -- RELACION CON PERMISOS DE FUNCIONAMIENTO
		
		duplicado_estado:{
			type: DataTypes.STRING,
			defaultValue: 'PENDIENTE'
		}, // text default 'PENDIENTE'::text, -- PENDIENTE, APROBADO, IMPRESO
		
		// fk_usuario_solicita int references admin.tb_usuarios(usuario_id), -- RELACION CON USUARIO QUE REGISTRA EL TRÁMITE
		fecha_solicitado:{
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE SOLICITUD
		
		// fk_usuario_aprueba int references admin.tb_usuarios(usuario_id), -- RELACION CON USUARIO QUE APRUEBA EL DUPLICADO
		fecha_aprobado:{
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FECHA DE APROBACIÓN DE DUPLICADO
		
		// fk_usuario_imprime int references admin.tb_usuarios(usuario_id), -- RELACION CON USUARIO QUE IMPRIME EL DUPLICADO - PERMISO
		fecha_impreso:{
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FECHA DE IMPRESIÓN DE DUPLICADO
		
		duplicado_precio: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(6,2) not null, -- PRECIO DE DUPLICADO
		
		duplicado_solicitud:{
			type: DataTypes.STRING
		}, // text, -- NÚMERO DE SOLICITUD
		duplicado_detalle:{
			type: DataTypes.STRING
		}, // text DEFAULT 'POR PERDIDA'::text, -- MOTIVO DE DUPLICADO
		
		// jtp_solicitud int references tthh.tb_personal_puestos(ppersonal_id), -- PERSONAL RESPONSABLE DE LOS TRAMITES
		// jtp_aprueba int references tthh.tb_personal_puestos(ppersonal_id)

	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}