'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_mantenimiento_facturas', {
		factura_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		factura_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		factura_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		factura_tipo: {
			type: DataTypes.STRING
		}, // text not null, -- MANO DE OBRA, REPUESTOS
		factura_numero: {
			type: DataTypes.STRING
		}, // text, -- NUMERO DE FACTURA
		factura_valor: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(8,2), -- VALOR INCLUIDO IVA
		
		factura_descripcion: {
			type: DataTypes.STRING
		}, // text DEFAULT 'PROFESIONAL TÉCNICO EN SERVICIOS GENERALES'::text, -- CARGO DEL RESPONSABLE

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}