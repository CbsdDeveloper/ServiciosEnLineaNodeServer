'use strict';
const db = require('../../models');

const staffModel = db.staff;
const workdayModel = db.workdays;

const user = db.users;

module.exports = {

    /*
     * ACTUALIZACIÓN DE INFORMACIÓN DE CÓDIGO DE BIOMÉTRICO
     */
    async updateBiometricCode(req, res){

        // BUSCAR MODELO DE WORKDAY
        const workday = await workdayModel.findByPk(req.body.fk_jornada_id);

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
               
    }

};
