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
        const productDetails = cartData.cart.map(item => {
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }
        });

        await publisher.publish(`cart-updates:${userId}`, JSON.stringify({totalQuantity, productDetails}));

        res.status(200).json({result, totalQuantity, productDetails});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
