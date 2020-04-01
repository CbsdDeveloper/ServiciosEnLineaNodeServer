'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_atendidos', {
		atendido_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		atendido_cedula: { 
			type: DataTypes.STRING
		}, // text, -- CEDULA DE ATENDIDO
		atendido_nombre: { 
			type: DataTypes.STRING
		}, // text, -- NOMBRE DE ATENDIDO - PROPIETARIO
		atendido_edad: { 
			type: DataTypes.STRING
		}, // text, -- EDAD DE ATENDIDO
		atendido_sexo: { 
			type: DataTypes.STRING
		}, // text, -- SEXO - TIPO
		atendido_tipo: { 
			type: DataTypes.STRING,
			defaultValue: 'ATENDIDOS' 
		}, // text, -- HERIDOS, FALLECIDOS, ATENDIDOS
		atendido_sintomas: { 
			type: DataTypes.STRING
		}, // text,
		atendido_traslado: { 
			type: DataTypes.STRING
		}, // text, -- H. PUBLICO, H. PRIVADO, H. SEGURO SOCIAL, CLINICA PARTICULA,
		atendido_traslado_unidad: { 
			type: DataTypes.STRING
		}, // text, -- SI, NO
		atendido_traslado_lugar: { 
			type: DataTypes.STRING
		}, // text,
		
		atendido_propietario: { 
			type: DataTypes.STRING
		}, // text, -- PROPIETARIO
		atendido_datosadicionales: { 
			type: DataTypes.STRING
		} // text -- DATOS ADICIONALES
		
	}, {
		schema: 'subjefatura',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}