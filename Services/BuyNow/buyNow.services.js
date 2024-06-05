const Product = require('../../models/product.model');
const Bill = require('../../models/bill.models');
const BillDetail = require('../../models/billDetail.model');
const Client = require('../../models/client.model');

async function BuyNow(userId, productId, quantity) {
    try {
        if (!userId || !productId || quantity <= 0) {
            throw new Error("Invalid request parameters.");
        }

        const product = await Product.findByPk(productId);
        const client = await Client.findByPk(userId);

        if (!product || !client) {
            throw new Error("Product or client not found.");
        }

        if (product.Quantity < quantity) {
            throw new Error("Not enough stock available.");
        }

        const newBill = await Bill.create({
            Date: new Date(),
            Client_id: userId,
            Created_at: new Date()
        });

        const newBillDetail = await BillDetail.create({
            Bill_id: newBill.Bill_id, 
            Product_id: productId,     
            Quantity: quantity,
            Price: quantity * product.Price
        });

        product.Quantity -= quantity;
        product.Sold += 1;
        await product.save();

        const totalPrice = quantity * product.Price;
        const responseMessage = `Product bought successfully. Bill Detail ID: ${newBillDetail.Bill_id}. Total Cost: ${totalPrice}. Purchase Time: ${newBill.Created_at}`;
        return responseMessage;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

module.exports = {
    BuyNow
};
