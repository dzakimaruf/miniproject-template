import { sequelize } from '../../config/config-db';
import villa_cart from '../models/villa_cart';


const createc = async (req, res, next) => {
    try {
        const user = req.users

        const cart = await req.context.models.Villa_cart.create(
            {
                vica_status: "open",
                vica_user_id: user.user_id,
            }
        );
        req.cart = villa_cart
        next()
    } catch (error) {
        return res.send(error)
    }
}

const findOne1 = async (req, res, next) => {
    const villa_cart = await req.context.models.Villa_cart.findOne({
        include: [{
            all: true
        }],
        where: { vica_user_id: req.body.order_user_id }
    });
    req.data = {
        vica_id: villa_cart.vica_id,
        item: villa_cart.line_items,
        days: villa_cart.lite_id
    }

    next();
}

const update = async (req, res) => {
    const { vica_id, vica_created_on, vica_status, vica_user_id } = req.body;
    const villa_cart = await req.context.models.Villa_cart.update(
        {
            vica_id: vica_id,
            vica_created_on: vica_created_on,
            vica_status: vica_status,
            vica_user_id: vica_user_id,
        },
        { returning : true, where: { vica_id : req.params.id}}
    );
    return res.send(villa_cart);
}

const update1 = async (req, res, next) => {
    const { vica_id } = req.data;
    const villa_cart = await req.context.models.Villa_cart.update(
        {
            vica_id: vica_id,
            vica_status: "closed",
        },
        { returning: true, where: { vica_id: vica_id } }
    );

    next();
}

export default {
    createc,
    findOne1,
    update1,
    update
}