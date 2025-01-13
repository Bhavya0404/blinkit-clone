const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');

const CACHE_KEY = 'cached:categories';

export default async function getCategory(req, res) {
    try {
        // Try to get from cache first
        const cachedCategories = await redis.get(CACHE_KEY);
        if (cachedCategories) {
            return res.status(200).json(JSON.parse(cachedCategories));
        }

        // If not in cache, fetch using pipeline
        const categoryIds = await redis.smembers('categories:all');
        const pipeline = redis.pipeline();
        
        categoryIds.forEach(id => {
            pipeline.hgetall(`category:${id}`);
        });

        const results = await pipeline.exec();
        const categories = results.map(([err, data], index) => {
            if (err) throw err;
            return data;
        });

        // Store in cache
        await redis.set(CACHE_KEY, JSON.stringify(categories));

        res.status(200).json(categories);

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
