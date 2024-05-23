const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Product = require("./product.model");
const Client = require("./client.model");

const Cart = sequelize.define(
    "Cart",
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: "Client_id",
            },
            primaryKey: true,
        },
        Product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "Product_id",
            },
            primaryKey: true,
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        TotalAmount: {
            type: DataTypes.VIRTUAL,
            get() {
                const quantity = this.getDataValue("Quantity");
                const product = this.Product;
                if (quantity && product) {
                    return quantity * product.Price;
                }
                return null;
            },
        },
    },
    {
        tableName: "cart",
        timestamps: false,
    }
);

Cart.belongsTo(Product, { foreignKey: "Product_id" });
Cart.belongsTo(Client, { foreignKey: "user_id" });

module.exports = Cart;
