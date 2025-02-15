const {getCart} = require('../../lib/cartservice');

export default async function cart (req, res) {
    try {
        const { id } = req.body;
        const result = await getCart(id);  // figure out way of calling this
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
