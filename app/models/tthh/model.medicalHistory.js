'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_historiasclinicas', {
		historia_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		historia_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		historia_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		historia_serie: { 
			type: DataTypes.STRING
		}, // text not null, -- 
		
		historia_tabaco: { 
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		historia_tabaco_detalle: { 
			type: DataTypes.STRING
		}, // text, -- 
		historia_alcohol: { 
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		historia_alcohol_detalle: { 
			type: DataTypes.STRING
		}, // text, -- 
		historia_drogas: { 
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		historia_drogas_detalle: { 
			type: DataTypes.STRING
		}, // text, -- 
		
		historia_app: { 
			type: DataTypes.STRING
		}, // text, --
		historia_apf: { 
			type: DataTypes.STRING
		}, // text, --
		historia_aqx: { 
			type: DataTypes.STRING
		}, // text, --
		historia_aobstetricos: { 
			type: DataTypes.STRING
		}, // text, --
		historia_alergias: { 
			type: DataTypes.STRING
		}, // text, --

		historia_menarquia: { 
			type: DataTypes.STRING
		}, // text, --
		historia_gestas: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, --
		historia_partos: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, --
		historia_abortos: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, --
		historia_otros: { 
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