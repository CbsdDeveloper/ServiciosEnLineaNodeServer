'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_reportes', {
		reporte_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		reporte_serie: {
			type: DataTypes.STRING 
		}, // text,
		reporte_tipo: {
			type: DataTypes.STRING,
			defaultValue: 'default'
		}, // text default 'default'::text,
		reporte_hoja: {
			type: DataTypes.STRING,
			defaultValue: 'A4'
		}, // text default 'A4'::text,
		reporte_orientacion: {
			type: DataTypes.STRING,
			defaultValue: 'P'
		}, // text default 'P'::text, -- P = portrait, L = landascape
		reporte_template: {
			type: DataTypes.STRING 
		}, // text not null,
		reporte_html: {
			type: DataTypes.STRING 
		}, // text,
		reporte_autodownload: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}, // boolean default false,
		reporte_printmode: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}, // boolean default false,
		
		reporte_nombre: {
			type: DataTypes.STRING 
		}, // text not null, -- NOMBRE DE REPORTE
		reporte_header: {
			type: DataTypes.STRING 
		}, // text not null, -- ENCABEZADO DE REPORTE
		
		reporte_jefatura: {
			type: DataTypes.STRING 
		}, // text not null, -- DIRECCION DE REPORTE
		reporte_departamento: {
			type: DataTypes.STRING 
		}, // text not null, -- DEPARTAMENTO O AREA DE REPORTE
		
		margin_bottom: {
			type: DataTypes.INTEGER, 
			defaultValue: 15
		}, // int not null default 15, -- mm :: MARGENES DE HOJA
		margin_top: {
			type: DataTypes.INTEGER, 
			defaultValue: 15
		}, // int not null default 15, -- mm :: MARGENES DE HOJA
		margin_left: {
			type: DataTypes.INTEGER, 
			defaultValue: 15
		}, // int not null default 15, -- mm :: MARGENES DE HOJA
		margin_right: {
			type: DataTypes.INTEGER, 
			defaultValue: 15
		}, // int not null default 15, -- mm :: MARGENES DE HOJA
		
		reporte_requisitos: {
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, // text default 'NO'::text, -- IMPRIMIR RECURSOS O NO
		
		responsable_nombre: {
			type: DataTypes.STRING 
		}, // text, -- NOMBRE DE RESPONSABLE DE REPORTE
		responsable_cargo: {
			type: DataTypes.STRING 
		}, // text, -- CARGO DE RESPONSABLE DE REPORTE
		
		reporte_css_pdf: {
			type: DataTypes.STRING 
		}, // text, -- ESTILO DE ENCABEZADO
		reporte_fields_pdf: {
			type: DataTypes.STRING 
		}, // text, -- CAMPOS PARA REPORTES
		reporte_headers_pdf: {
			type: DataTypes.STRING 
		}, // text, -- NOMBRES DE ENCABEZADOS
		
		reporte_fields_xls: {
			type: DataTypes.STRING 
		}, // text, -- CAMPOS PARA REPORTES
		reporte_headers_xls: {
			type: DataTypes.STRING 
		}, // text, -- NOMBRES DE ENCABEZADOS
		
		reporte_permiso: {
			type: DataTypes.INTEGER, 
			defaultValue: 0
		} // int default 0 -- ID DE PERMISO 
		
	}, {
		schema: 'admin',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}