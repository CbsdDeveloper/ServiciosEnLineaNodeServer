const db = require('../config/db.config.js');
const sql = db.sequelize;

// Personal en funciones
exports.findCodesByNature = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    var codesList = {};
    var selectedList = [];
    sql.query("SELECT * FROM resources.tb_codigosinstitucionales", replacements).then(function (data) {
        // LISTADO DE CLAVES SEGUN CLASIFICACION -> codigo_tipo
        data.forEach((v, k) => {
            if(!codesList[v.codigo_tipo]) codesList[v.codigo_tipo]=[]; 
            codesList[v.codigo_tipo].push(v); 
        });
        sql.query("SELECT * FROM subjefatura.tb_naturaleza_claves WHERE fk_naturaleza_id = :natureId", { replacements: req.body, type: sql.QueryTypes.SELECT }).then(function (selected) {
            selected.forEach((v, k) => {
                selectedList.push(v.fk_clave_id); 
            });
            res.status(200).json({
                status: (data.length>0)?true:false,
                message: 'CLASIFICACION DE CODIGOS INSTITUCIONALES',
                length: data.length,
                data: {
                    codesList: codesList,
                    selectedList: selectedList
                }
            });
        });
    }).catch(function (err) {return next(err);});
};