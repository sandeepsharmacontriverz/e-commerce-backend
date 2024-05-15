import { DataTypes } from 'sequelize';
import db from '../database/db_connet';

const Category = db.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cat_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cat_description: {
        type: DataTypes.STRING,
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

Category.associate = (models: any) => {
    Category.hasMany(models.product, {
        foreignKey: 'cat_id',
        as: 'categories',
    });
};

Category.sync();

export default Category;