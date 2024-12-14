const redis = require('../../app/database/redis');
const pool = require('../../app/database/postgres');


export default async function getCategory(req, res) {
    const categoryIds = await redis.smembers('categories:all');
    const categories = [];
    for (const id of categoryIds) {
        const name = await redis.hget(`category:${id}`, 'name');
        categories.push({ id, name });
    }
    res.status(200).json(categories);
    // console.log(categories);
}
