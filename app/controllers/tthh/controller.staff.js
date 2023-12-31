'use strict';
const db = require('../../models');

const staffModel = db.tthh.staff;
const workdayMdl = db.tthh.workdays;

const personMdl = db.resources.persons;

/*
* CONSULTAR INFORMACION DE PERSONAL POR NUMERO DE CEDULA
*/
const getStaffInfo = async (type, data) => {
    // VARIABLES AUXILIARES
    let strWhr;

    // VALIDAR EL TIPO DE CONSULTA
    if( type == 'staffId' ){
        // CONSULTAR MODELO POR ID
        strWhr = {
            include: [{ model: personMdl, as: 'person' }],
            where: { personal_id: data }
        };
    }else if( type == 'personId' ){
        // CONSULTAR MODELO POR ID
        strWhr = {
            include: [{ model: personMdl, as: 'person' }],
            where: { fk_persona_id: data }
        };
    }else if( type == 'userId' ){
        // CONSULTAR MODELO POR ID
        strWhr = {
            include: [{ model: personMdl, as: 'person' }],
            where: { fk_persona_id: data }
        };
    }else if( type == 'personCC' ){
        // CONSULTAR MODELO POR ID
        strWhr = {
            include: [{ 
                model: personMdl, as: 'person',
                where: { persona_doc_identidad: data }
            }]
        };
    }

    // VALIDAR EXISTENCIA DE REGISTROS
    if( await staffModel.count( strWhr ) >0 ) return db.parseJSON('ok', true, await staffModel.findOne( strWhr ));

    // ENVIAR MENSAJE POR DEFECTO
    return db.parseJSON('No se ha encontrado ningún registro con los datos que usted a ingresado.');
};

module.exports = {

    /*
     * ACTUALIZACIÓN DE INFORMACIÓN DE CÓDIGO DE BIOMÉTRICO
     */
    async updateBiometricCode(req, res){

        // BUSCAR MODELO DE WORKDAY
        const workday = await workdayMdl.findByPk(req.body.fk_jornada_id);

        // BUSCAR MODELO
        let staff = await staffModel.findByPk(req.body.personal_id);

        // ACTUALIZAR DATOS DE BIOMETRICO
        await staff.update({
            biometrico_id: req.body.biometrico_id,
            personal_estado: req.body.personal_estado
        });

        // ACTUALIZAR JORNADA DE TRABAJO
        staff.setWorkday(workday);

        // RETORNAR CONSULTA
        db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE',true,staff);
               
    },

    /*
     * CONSULTAR REGISTRO
     */
    async requestEntity(req, res){

        // RECIBIR INFORMACION DE FORMULARIO
        let data = req.body, json = db.parseJSON('No se ha especificado el recurso a consumir...');
        
        // VALIDAR LA CONSULTA
        if( data.type == 'personCC' ) json = await getStaffInfo(data.type, data.data);
        else if( data.type == 'staffId' ) json = await getStaffInfo(data.type, data.data);
        else if( data.type == 'personId' ) json = await getStaffInfo(data.type, data.data);

        // MENSAJE POR DEFECTO
        db.sendJSON( res, json );
    },

    /*
     * LISTADO DE PERSONAL ACTIVO
     */
    async staffActiveList(req, res){

        // VALIDAR LA CONSULTA
        let list = await staffModel.findAll({
            where: {
                personal_estado: 'EN FUNCIONES'
            },
            attributes: ['personal_correo_institucional','personal_id'],
            include: [
                {
                    model: personMdl, as: 'person',
                    attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
                }
            ],
            order: [ 
                [ { model: personMdl, as: 'person' }, 'persona_apellidos', 'ASC' ]
            ]
        });

        // RETORNAR CONSULTA
        db.setEmpty(res,'LISTADO DE PERSONAL - ACTIVOS',true,list);
    },


};
