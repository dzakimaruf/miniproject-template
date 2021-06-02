import { sequelize } from '../../config/config-db';
import errorHandler from './../helpers/dbErrorHandler'

const findAll = async (req, res) => {
    const villas = await req.context.models.Villas.findAll(
        {
            include: [{
                all: true
            }]
        }
    );
    return res.send(villas);
}
const findOne = async (req, res, next) => {
    try {
        const villas = await req.context.models.Villas.findOne({
            where: { villa_id: req.params.id }
        });
        req.villas = villas
        next()
    } catch (error) {
        console.log(error);
    }

}
const findOne1 = async (req, res, next) => {
    const { item } = req.data

    let price = 0;
    let discount = 0;

    for (let x of item) {
        const villas = await req.context.models.Villas.findOne({
            //create body cors_id 
            where: { villa_id: x.lite_villa_id }
        })
        price = villas.villa_price 

        if (x.lite_days > 2) {
            discount = price * 0.05;
        }
    }

    req.price = {
        harga: price,
        discount: discount
    }

    next()
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
        villa_price: req.body.villa_price,
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
            villa_price: req.body.villa_price,
            villa_user_id: req.body.villa_user_id

        },
        { returning: true, where: { villa_id: req.params.id } }
    );
    return res.send(villas);
}

const remove = async (req, res) => {
    await req.context.models.Villas.destroy({
        where: { villa_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.send("delete " + result + " rows.");
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
    findOne1,
    create,
    update,
    remove,
    rawSQL
}