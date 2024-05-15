import { DataTypes } from 'sequelize';
import db from '../database/db_connet';

const Role = db.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
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

Role.associate = (models: any) => {
    Role.hasMany(models.Transaction, {
        foreignKey: 'id',
        as: 'roles',
    });
};

Role.sync();

export default Role;