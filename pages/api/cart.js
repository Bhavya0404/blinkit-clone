const {addToCart, removeFromCart, getCart} = require('../../lib/cartservice');

export default async function cart (req, res) {
    try {
        const {userId, storeId, productId, addProduct} = req.body;
        // const result = await getCart(userId);  // figure out way of calling this
        //     res.status(200).json(result);
        if(addProduct){
            const result = await addToCart(userId, storeId, productId);
            res.status(200).json(result);
        } else {
            console.log("remove from cart");
            const result = await removeFromCart(userId, storeId, productId);
            res.status(200).json(result);
        }
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
