import { sequelize } from '../../config/config-db';
import orders from '../models/orders';


const findAll = async (req, res) => {
    const orders = await req.context.models.Orders.findAll();
    return res.send(orders);
}
const findOne = async (req, res) => {
    const orders = await req.context.models.Orders.findOne({
        where: { order_id: req.params.id }
    });
    return res.send(orders);
}

const create = async (req, res) => {
    const orders = await req.context.models.Orders.create({
        order_created_on: req.body.order_created_on,
        order_start_date: req.body.order_start_date,
        order_end_date: req.body.order_end_date,
        order_tax:req.body.order_tax,
        order_discount:req.body.order_discount,
        order_total_due:req.body.order_total_due,
        order_total_days:req.body.order_total_days,
        order_description: req.body.order_description,
        order_payt_trx_number:req.body.order_payt_trx_number,
        order_city:req.body.order_city,
        order_address:req.body.order_address,
        order_status: req.body.order_status,
        order_user_id:req.body.order_user_id,
    });
    return res.send(orders);
}

const update = async (req, res) => {
    const orders = await req.context.models.Orders.update(
        {
            order_created_on: req.body.order_created_on,
            order_start_date: req.body.order_start_date,
            order_end_date: req.body.order_end_date,
            order_tax:req.body.order_tax,
            order_discount:req.body.order_discount,
            order_total_due:req.body.order_total_due,
            order_total_days:req.body.order_total_days,
            order_description: req.body.order_description,
            order_payt_trx_number:req.body.order_payt_trx_number,
            order_city:req.body.order_city,
            order_address:req.body.order_address,
            order_status: req.body.order_status,
            order_user_id:req.body.order_user_id,
        },
        { returning: true, where: { order_id: req.params.id } }
    );
    return res.send(orders);
}

const remove = async (req, res) => {
    await req.context.models.Orders.destroy({
        where: { order_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.send("delete " + result + " rows.");
    });

}

const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM regions where order_id = :orderId',
        { replacements: { orderId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT }
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