
const pool = require('../../app/database/postgres');
const redis = require('../../app/database/redis');

export default async function placeOrder(req, res) {
    const {userId, orderDetails, grandTotal, totalQuantity, storeId } = req.body;
    try {
        const orderDetailsJson = JSON.stringify(orderDetails);
        const query = `insert into orders (user_id, order_details, grand_total, total_quantity)
        values ($1, $2, $3, $4) returning order_id;
        `
        const result = await pool.query(query, [userId.userId, orderDetailsJson, grandTotal, totalQuantity]);
        if(result){
            for(const item of orderDetails){
                const updateSqlQuery = `update store_inventory
                    set current_quantity = current_quantity - $1
                    where product_id = $2 and store_id = $3;
                `
                console.log(item);
                await pool.query(updateSqlQuery, [item.quantity, item.productId, storeId])
            }

            await redis.del( `cart:${userId.userId}`);
        }
        res.status(200).json(result.rows[0]);
    } catch (error){
        res.status(500).json({ message: 'Failed to place order', error: error.message });
    }  
}