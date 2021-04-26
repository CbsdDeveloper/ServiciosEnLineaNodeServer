'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_revision_extintor', {
		revision_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		revision_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		revision_estado: { 
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		
		revision_ubicacion_extintor: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_agente_extintor: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_fvencimiento: { 
			type: DataType.DATE 
		}, // date, -- 
		
		revision_manometro: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_manguera: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_boquilla: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_manija: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_cilindro: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_pintura: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_senializacion: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_ubicacion: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_visibilidad: { 
			type: DataType.STRING 
		}, // text, -- 
		revision_acceso: { 
			type: DataType.STRING 
		}, // text, -- 
		
		revision_observaciones: { 
			type: DataType.STRING 
		}, // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}