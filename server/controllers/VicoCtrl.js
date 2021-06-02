import { sequelize } from '../../config/config-db';

const findAll = async (req, res) => {
    const villas_comments = await req.context.models.Villas_comments.findAll(
        {
            include: [{
                all: true
            }]
        }
    );
    return res.send(villas_comments);
}

const findOne = async (req, res) => {
    const villas_comments = await req.context.models.Villas_comments.findOne({
        where: { vico_id: req.params.id }
    });
    return res.send(villas_comments);
}

const create = async (req, res) => {
    const villas_comments = await req.context.models.Villas_comments.create({
        vico_comments:req.body.vico_comments,
        vico_created_on:req.body.vico_created_on,
        vico_rating:req.body.vico_rating,
        vico_villa_id:req.body.vico_villa_id,
        vico_user_id:req.body.vico_user_id
    });
    return res.send(villas_comments);
}

const update = async (req, res) => {
    const villas_comments = await req.context.models.Villas_comments.update(
        {
        vico_comments:req.body.vico_comments,
        vico_created_on:req.body.vica_created_on,
        vico_rating:req.body.vico_rating,
        vico_villa_id:req.body.vico_villa_id,
        vico_user_id:req.body.vico_user_id
        },
        { returning: true, where: { vico_id: req.params.id } }
    );
    return res.send(villas_comments);
}

const remove = async (req, res) => {
    await req.context.models.Villas_comments.destroy({
        where: { vico_id: req.params.id }
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