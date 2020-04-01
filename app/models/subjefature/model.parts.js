'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_partes', {
		parte_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		parte_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		parte_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ELABORADO' 
		}, // text default 'EN CURSO'::text, // EN CURSO, FINALIZADO
		
		// 0. 
		parte_codigo: { 
			type: DataTypes.STRING
		}, // text, // AÑO-ESTACION-SERIE
		parte_serie: { 
			type: DataTypes.INTEGER
		}, // int default 0,
		
		// 1. GENERAL
		parte_clasedia: { 
			type: DataTypes.STRING
		}, // text, // FERIADO, LABORABLE, FIN DE SEMANA, ESTADO DE EMERGENCIA
		parte_fecha: { 
			type: DataTypes.DATE,
		}, // timestamp without time zone, --
		
		// 2. ATENDIDO POR
		parte_atendido_por: { 
			type: DataTypes.STRING
		}, // text,
		parte_apoyo_unidades: { 
			type: DataTypes.STRING
		}, // text, // 
		parte_apoyo_personal_concurrio: { 
			type: DataTypes.STRING
		}, // text, // 
		parte_apoyo_requerido: { 
			type: DataTypes.STRING
		}, // text, // SI, NO
		parte_apoyo_adicional: { 
			type: DataTypes.STRING
		}, // text, // POLICIA, CRUZ ROJA, EJERCITO, CIUDADANIA, OTROS
		parte_apoyo_detalle: { 
			type: DataTypes.STRING
		}, // text, // DETALLE, COMPAÑIA Y VEHICULOS
		
		// 3. FORMA DE AVISO
		parte_aviso_forma: { 
			type: DataTypes.STRING
		}, // text, // CR, TELEFONO, PERSONAL
		parte_aviso_especificacion: { 
			type: DataTypes.STRING
		}, // text, // 
		parte_aviso_hora: { 
			type: DataTypes.DATE,
		}, // timestamp without time zone,
		parte_salida_personal: { 
			type: DataTypes.DATE,
		}, // timestamp without time zone,
		parte_llegada_personal: { 
			type: DataTypes.DATE,
		}, // timestamp without time zone,
		parte_retorno: { 
			type: DataTypes.DATE,
		}, // timestamp without time zone,
		parte_ingreso_cuartel: { 
			type: DataTypes.DATE,
		}, // timestamp without time zone,
		
		// 4. LOCALIZACIÓN
		parte_localizacion_direccion: { 
			type: DataTypes.STRING
		}, // text,
		parte_localizacion_telefono: { 
			type: DataTypes.STRING
		}, // text,
		parte_localizacion_sector: { 
			type: DataTypes.STRING
		}, // text,
		parte_localizacion_zona: { 
			type: DataTypes.STRING
		}, // text, // URBANA, RURAL
		parte_localizacion_detalle: { 
			type: DataTypes.STRING
		}, // text, // URBANA, RURAL
		
		
		// 5. 6. TIPO & CAUSAS
		parte_tipo: { 
			type: DataTypes.STRING
		}, // text, // AUXILIOS, INDENCIOS
		
		
		// 7. 8. HERIDOS Y FALLECIDOS
		// subjefatura.tb_atendidos
		
		
		// 9. PERSONAS/INSTITUCIONES ATENDIDAS
		
		
		// 11. DAÑOS MATERIALES
		parte_danios: { 
			type: DataTypes.STRING
		}, // text,
		
		
		// 10. DESCRIPCIÓN DE OPERACIONES
		parte_operaciones: { 
			type: DataTypes.STRING
		}, // text,
		// 11. MATERIAL Y EQUIPO EMPLEADO
		parte_material: { 
			type: DataTypes.STRING
		}, // text,
		// 12. OBSERVACIONES
		parte_observaciones: { 
			type: DataTypes.STRING
		}, // text,
		// 13. LUGAR
		parte_croquis: { 
			type: DataTypes.STRING
		}, // text,
		// 14. NOVEDADES
		parte_novedades: { 
			type: DataTypes.STRING
		} // text
		
	}, {
		schema: 'subjefatura',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}