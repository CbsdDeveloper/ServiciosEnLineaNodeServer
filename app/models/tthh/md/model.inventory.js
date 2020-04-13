'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_inventario_medicamentos', {
		inventario_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		inventario_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		inventario_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		fk_personal_id: { 
			type: DataTypes.INTEGER
		}, // integer not null references tthh.tb_personal(personal_id), -- 
		
		inventario_transaccion: { 
			type: DataTypes.STRING
		}, // text not null, -- DESCARGO, INGRESO
		inventario_cantidad: {
			type: DataTypes.DECIMAL(8,2)
		}, // numeric(8,2) default 0, -- 
		inventario_descripcion: { 
			type: DataTypes.STRING 
		}, // text, -- 
		
		fk_table: { 
			type: DataTypes.STRING
		}, // text, -- CONSULTA MEDICA, ESTACION
		fk_id: { 
			type: DataTypes.INTEGER
		} // int -- ID DE ENTIDADES
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}