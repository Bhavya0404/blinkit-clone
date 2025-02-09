import pool from '../../../app/database/postgres'

export default async function handler(req, res) {
    const {number} = req.body;
    console.log("Num",number);
    try {
        const query = `SELECT * FROM users WHERE phone_number = $1`;
        const result = await pool.query(query, [number]);
        
        if(!result.rows.length){
            const insertQuery = `INSERT INTO users (phone_number) VALUES ($1)`;
            const insertResult = await pool.query(insertQuery, [number]);
            user = insertResult.rows[0];
            console.log("User created");
            return res.status(201).json({ message: 'User created'});
        }

        res.status(200).json({message: 'User verified'});
    } catch (error) {
        console.error("Error in verifying user", error);
        res.status(500).json({message: 'Internal server error'});
    }
}
