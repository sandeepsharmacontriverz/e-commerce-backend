import { DataTypes } from 'sequelize';
import db from '../database/db_connet';
import Cards from './card.model';
import Product from './product.model';

const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assined_driver: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    invoice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    card_items: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: false,
    },
    mode_of_payment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});
Order.associate = (models: any) => {
    Order.hasMany(models.Cards, { foreignKey: 'order_id', as: 'card' });
}

// Order.hasMany(Product);

Order.sync();

export default Order;