
const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');

const productDetails  = async (req, res) => {
    const {productId} = req.body;
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

export default productDetails;