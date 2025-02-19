const {addToCart, removeFromCart, getCart} = require('../../lib/cartservice');
const {publisher} = require('../../lib/redisPubSub');
export default async function cart (req, res) {
    try {
        const {userId, storeId, productId, addProduct} = req.body;
        
        let result;
        if (addProduct) {
            result = await addToCart(userId, storeId, productId);
        } else {
            result = await removeFromCart(userId, storeId, productId);
        }

        const cartData = await getCart(userId);
        const totalQuantity = cartData.cart.reduce((sum, curr) => sum + curr.quantity, 0);
        const productIds = cartData.cart.map(item => item.productId);

        console.log("totalQuantity BE", totalQuantity);
        await publisher.publish(`cart-updates:${userId}`, JSON.stringify({totalQuantity, productIds}));

        res.status(200).json({result, totalQuantity});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
