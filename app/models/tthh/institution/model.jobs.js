'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_puestos', {
		puesto_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		puesto_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		puesto_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		puesto_nombre: { 
			type: DataTypes.STRING 
		}, // text not null, -- NOMBRE DE PUESTO
		
		puesto_remuneracion: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(10,2) default 0, -- REMUNERACIÓN DEL PUESTO
		
		puesto_direccion: { 
			type: DataTypes.STRING 
		}, // text default 'NO'::text, -- DECLARAR QUE ES O NO UNA DIRECCIÓN
		puesto_grado: { 
			type: DataTypes.INTEGER ,
			defaultValue: 3
		}, // int default 3, -- JERARQUIA DEL PUESTO
		puesto_modalidad: { 
			type: DataTypes.STRING ,
			defaultValue: 'ADMINISTRATIVO' 
		}, // text default 'ADMINISTRATIVO'::text, -- MODALIDAD DEL PUESTO [ADMINISTRATIVO - OPERATIVO]
		
		puesto_fecha_creacion: { 
			type: DataTypes.DATE
		 }, // date -- FECHA DE CREACIÓN
		puesto_baselegal: { 
			type: DataTypes.STRING 
		}, // text, -- DOCUMENTO / BASE LEGAL DE MOVIMIENTO
		puesto_partida: { 
			type: DataTypes.STRING 
		}, // text -- NUMERO DE PARTIDA

		fk_grupo_id: { 
			type: DataTypes.INTEGER
		}, // int references tthh.tb_gruposocupacionales(grupo_id), -- GRUPO OCUPACIONAL
		puesto_coigo: { 
			type: DataTypes.STRING 
		} // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}