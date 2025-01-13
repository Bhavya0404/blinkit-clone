const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');

const CACHE_KEY = 'cached:subcategories';

export default async function getSubCategory(req, res) {
    const { categoryId } = await req.body;
    try {
        // const cachedSubcategories = await redis.get(CACHE_KEY);
        // if (cachedSubcategories) {
        //     return res.status(200).json(JSON.parse(cachedSubcategories));
        // }

        // const categoryId = categoryId;
        const subcategories = await redis.zrange(
            `category-sub:${categoryId}:subcategories`,
            0,
            -1
        );
        
        const parsedSubcategories = subcategories.map(sub => JSON.parse(sub));
        // Set cache without expiration
        await redis.set(CACHE_KEY, JSON.stringify(parsedSubcategories));
        
        res.status(200).json(parsedSubcategories);
    } catch (err) {
        console.error("Error fetching subcategories:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
