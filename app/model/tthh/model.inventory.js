'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_inventario_medicamentos', {
		inventario_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		inventario_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		inventario_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		fk_personal_id: { 
			type: Sequelize.INTEGER
		}, // integer not null references tthh.tb_personal(personal_id), -- 
		
		inventario_transaccion: { 
			type: Sequelize.STRING
		}, // text not null, -- DESCARGO, INGRESO
		inventario_cantidad: {
			type: Sequelize.DECIMAL(8,2)
		}, // numeric(8,2) default 0, -- 
		inventario_descripcion: { 
			type: Sequelize.STRING 
		}, // text, -- 
		
		fk_table: { 
			type: Sequelize.STRING
		}, // text, -- CONSULTA MEDICA, ESTACION
		fk_id: { 
			type: Sequelize.INTEGER
		} // int -- ID DE ENTIDADES
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}