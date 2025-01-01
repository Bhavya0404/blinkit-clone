const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');


const CACHE_KEY = 'cached:products';
const CACHE_TTL = 3600;

export default async function getProducts(req, res) {
    try {
        const cachedProducts = await redis.get(CACHE_KEY);
        if (cachedProducts) {
            return res.status(200).json(JSON.parse(cachedProducts));
        }

        const subCategoryId = 'd0e6c978-e5ee-49a7-8b8e-577af537ae57';
        const productIds = await redis.smembers(`subcategory:${subCategoryId}:products`);
        
        const pipeline = redis.pipeline();
        productIds.forEach(id => {
            pipeline.hgetall(`product:${id}`);
        });
        
        const results = await pipeline.exec();
        const productDetails = results
            .map(([err, data]) => err ? null : data)
            .filter(Boolean);

        await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(productDetails));
        res.status(200).json(productDetails);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
