import { sequelize } from '../../config/config-db';

const findAll = async (req, res) => {
    const villas = await req.context.models.Villas.findAll();
    return res.send(villas);
}
const findOne = async (req, res) => {
    const villas = await req.context.models.Villas.findOne({
        where: { villa_id: req.params.id }
    });
    return res.send(villas);
}

const create = async (req, res) => {
    const villas = await req.context.models.Villas.create({
        villa_id: req.body.villa_id,
        villa_title: req.body.villa_title,
        villa_description: req.body.villa_description,
        villa_address: req.body.villa_address,
        villa_tipe: req.body.villa_tipe,
        villa_kamar_tidur: req.body.villa_kamar_tidur,
        villa_kamar_mandi: req.body.villa_kamar_mandi,
        villa_lantai: req.body.villa_lantai,
        villa_fasilitas: req.body.villa_fasilitas,
        villa_status: req.body.villa_status,
        villa_price:req.body.villa_price,
        villa_user_id: req.body.villa_user_id

    });
    return res.send(villas);
}

const update = async (req, res) => {
    const villas = await req.context.models.Villas.update(
        {  
            villa_id: req.body.villa_id,
            villa_title: req.body.villa_title,
            villa_description: req.body.villa_description,
            villa_address: req.body.villa_address,
            villa_tipe: req.body.villa_tipe,
            villa_kamar_tidur: req.body.villa_kamar_tidur,
            villa_kamar_mandi: req.body.villa_kamar_mandi,
            villa_lantai: req.body.villa_lantai,
            villa_fasilitas: req.body.villa_fasilitas,
            villa_status: req.body.villa_status,
            villa_price:req.body.villa_price,
            villa_user_id: req.body.villa_user_id
            
         },
        { returning: true, where: { villa_id: req.params.id } }
    );
    return res.send(villas);
}

const remove = async (req, res) => {
    await req.context.models.Villas.destroy({
          where: { villa_id: req.params.id }
    }).then(result =>{
        console.log(result);
        return res.send("delete "+result+" rows.");
    });
    
}
const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM regions where villa_id = :villaId',
        { replacements: { villaId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT } 
    ).then(result => {
        return res.send(result);
    })
}


export default {
    findAll,
    findOne,
    create,
    update,
    remove,
    rawSQL
}