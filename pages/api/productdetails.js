
const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');

const productDetails  = async (req, res) => {
    const {productId, fromCart} = req.body;

    if(fromCart){
        try {
            const pipeline = redis.pipeline();
            productId.forEach(async id => {
                pipeline.hgetall(`product:${id}`);
            });

            const results = await pipeline.exec();
            const parsedData = results.map(result => {
                return {
                    productId: result[1].id,
                    name: result[1].name,
                    price: result[1].price,
                    image_url: result[1].image_url,
                    secondary_images: result[1].secondary_images,
                    weight: result[1].weight,
                }
            })
            return res.status(200).json(parsedData);
        } catch (error) {
            console.log("error fetch product details", error);
            res.status(500).json({ error: 'Internal server error' });
        }

    } else {
        try {
            const productDetails = await redis.hgetall(`product:${productId}`);
            const parsedData = {
                ...productDetails,
                additional_attributes: JSON.parse(productDetails.additional_attributes) || [],
                secondary_images: JSON.parse(productDetails.secondary_images) || [],
            }
            res.status(200).json(parsedData);
        } catch (error) {
            console.log("error fetch product details", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

export default productDetails;