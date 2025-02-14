const redis = require('../app/database/redis');


function getCartKey(userId){
    return `cart:${userId}`;
}

// checks in store inventory
function getInventoryKey(storeId, productId){
    return `store:${storeId}:inventory:${productId}`
}

// doing everything for a particular product
export async function addToCart(userId, storeId, productId){
    const cartKey = getCartKey(userId);
    const inventoryKey = getInventoryKey(storeId, productId);
    try {
        // check if the product is in stock
        const currentStock = await redis.hget(inventoryKey, 'current_quantity');
        if(!currentStock || parseInt(currentStock) == 0){
            throw new Error('Insufficient stock');
        }
        
        // update the cart stock
        const cartStock = await redis.hget(cartKey, productId);
        await redis.hset(inventoryKey, 'current_quantity', parseInt(currentStock) - 1);  // update the inventory
        const cartQuantity = cartStock ? JSON.parse(cartStock).quantity : 0;
        const newCartQuantity = cartQuantity + 1;  // send the new quantity
 
        // update the cart in Redis

        const cartData = {
            productId: productId,
            quantity: newCartQuantity,
            storeId: storeId,
            addedAt: new Date().toISOString()
        }

        await redis.hset(cartKey, productId, JSON.stringify(cartData));
        // await redis.expire(cartKey, 30);  // 30 seconds expiration

        return {success: true, message: 'Product added to cart', cart: cartData};
    } catch (error) {
        throw new Error('Error in adding product to cart');
    }
}

export async function removeFromCart(userId, storeId,productId){
    const cartKey = getCartKey(userId);
    const inventoryKey = getInventoryKey(storeId, productId);
    try {
        const cartStock = await redis.hget(cartKey, productId);
        const cartQuantity = cartStock ? JSON.parse(cartStock).quantity : 0;
        const newCartQuantity = cartQuantity - 1;  // send the new quantity

        const currentStock = await redis.hget(inventoryKey, 'current_quantity');
        await redis.hset(inventoryKey, 'current_quantity', parseInt(currentStock) + 1); // updating the inventory

        //removing the product from cart if the quantity is 0
        if(newCartQuantity === 0){
            await redis.hdel(cartKey, productId);
            return {success: true, message: 'Product removed from cart'};

        } 

        // updating the cart
        const cartData = {
            productId: productId,
            quantity: newCartQuantity,
            storeId: storeId,
            addedAt: new Date().toISOString()
        }
        await redis.hset(cartKey, productId, JSON.stringify(cartData));
        return {success: true, message: 'Product removed from cart'};

    } catch (error) {
        throw new Error('Error in removing product from cart');
    }
}

// parse it
export async function getCart(userId){
    const cartKey = getCartKey(userId);
    try {
        const cartItems = await redis.hgetall(cartKey);
        return {success: true, cart: cartItems};
    } catch (error) {
        throw new Error('Error in getting cart');
    }
}
