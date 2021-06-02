import Sequelize from 'sequelize';
import { sequelize } from '../../config/config-db';
import users from './users';
import villas from './villas';
import orders from './orders';
import villa_cart from './villa_cart';
import villas_comments from './villas_comments';
import line_items from './line_items'

const models = {
    Users: users(sequelize, Sequelize),
    Villas: villas(sequelize, Sequelize),
    Orders: orders(sequelize, Sequelize),
    Villa_cart: villa_cart(sequelize, Sequelize),
    Villas_comments: villas_comments(sequelize, Sequelize),
    Line_items: line_items(sequelize, Sequelize)
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export default models;