'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_puestos', {
		puesto_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		puesto_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		puesto_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		puesto_nombre: { 
			type: Sequelize.STRING 
		}, // text not null, -- NOMBRE DE PUESTO
		
		puesto_remuneracion: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric(10,2) default 0, -- REMUNERACIÓN DEL PUESTO
		
		puesto_direccion: { 
			type: Sequelize.STRING 
		}, // text default 'NO'::text, -- DECLARAR QUE ES O NO UNA DIRECCIÓN
		puesto_grado: { 
			type: Sequelize.INTEGER ,
			defaultValue: 3
		}, // int default 3, -- JERARQUIA DEL PUESTO
		puesto_modalidad: { 
			type: Sequelize.STRING ,
			defaultValue: 'ADMINISTRATIVO' 
		}, // text default 'ADMINISTRATIVO'::text, -- MODALIDAD DEL PUESTO [ADMINISTRATIVO - OPERATIVO]
		
		puesto_fecha_creacion: { 
			type: Sequelize.DATE
		 }, // date -- FECHA DE CREACIÓN
		puesto_baselegal: { 
			type: Sequelize.STRING 
		}, // text, -- DOCUMENTO / BASE LEGAL DE MOVIMIENTO
		puesto_partida: { 
			type: Sequelize.STRING 
		}, // text -- NUMERO DE PARTIDA

		fk_grupo_id: { 
			type: Sequelize.INTEGER
		}, // int references tthh.tb_gruposocupacionales(grupo_id), -- GRUPO OCUPACIONAL
		puesto_coigo: { 
			type: Sequelize.STRING 
		} // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}