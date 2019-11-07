'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_historiasclinicas', {
		historia_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		historia_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		historia_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		historia_serie: { 
			type: Sequelize.STRING
		}, // text not null, -- 
		
		historia_tabaco: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		historia_tabaco_detalle: { 
			type: Sequelize.STRING
		}, // text, -- 
		historia_alcohol: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		historia_alcohol_detalle: { 
			type: Sequelize.STRING
		}, // text, -- 
		historia_drogas: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		historia_drogas_detalle: { 
			type: Sequelize.STRING
		}, // text, -- 
		
		historia_app: { 
			type: Sequelize.STRING
		}, // text, --
		historia_apf: { 
			type: Sequelize.STRING
		}, // text, --
		historia_aqx: { 
			type: Sequelize.STRING
		}, // text, --
		historia_aobstetricos: { 
			type: Sequelize.STRING
		}, // text, --
		historia_alergias: { 
			type: Sequelize.STRING
		}, // text, --

		historia_menarquia: { 
			type: Sequelize.STRING
		}, // text, --
		historia_gestas: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, --
		historia_partos: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, --
		historia_abortos: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, --
		historia_otros: { 
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