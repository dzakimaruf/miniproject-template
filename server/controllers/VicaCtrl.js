import { sequelize } from '../../config/config-db';

const findAll = async (req, res) => {
    const villa_cart = await req.context.models.Villa_cart.findAll();
    return res.send(villa_cart);
}

const findOne = async (req, res) => {
    const villa_cart = await req.context.models.Villa_cart.findOne({
        where: { vica_id: req.params.id }
    });
    return res.send(villa_cart);
}

const create = async (req, res) => {
    const villa_cart = await req.context.models.Villa_cart.create({
        vica_created_on:req.body.vica_created_on,
        vica_status:req.body.vica_status,
        vica_user_id:req.body.vica_user_id,
    });
    return res.send(villa_cart);
}

const update = async (req, res) => {
    const villa_cart = await req.context.models.Villa_cart.update(
        {
            vica_created_on:req.body.vica_created_on,
            vica_status:req.body.vica_status,
            vica_user_id:req.body.vica_user_id,
        },
        { returning: true, where: { vica_id: req.params.id } }
    );
    return res.send(villa_cart);
}

const remove = async (req, res) => {
    await req.context.models.Villa_cart.destroy({
        where: { vica_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.send("delete " + result + " rows.");
    });

}
const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM users where user_id = :userId',
        { replacements: { userId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT }
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