'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_inasistencias_control', {
		control_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		control_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),

		control_tipo: { 
			type: DataTypes.STRING,
			defaultValue: 'OBSERVACIÓN' 
		}, // text default 'OBSERVACIÓN'::text, -- 
		
		control_descripcion: { 
			type: DataTypes.STRING
		}, // text not null, -- 
		control_adjunto: { 
			type: DataTypes.STRING
		} // text not null, -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}