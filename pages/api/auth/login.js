import { serialize } from 'cookie'
import { encrypt } from '../../../lib/session'
import pool from '../../../app/database/postgres'

export default async function handler(req, res) {
  const { number } = req.body;
  let result;
  try {
    const query = `SELECT * FROM users WHERE phone_number = $1`;
    result = await pool.query(query, [number]);

    if(!result.rows.length){
      const insertQuery = `INSERT INTO users (phone_number) VALUES ($1)`;
      await pool.query(insertQuery, [number]);
      
      const query = `SELECT * FROM users WHERE phone_number = $1`;
      result = await pool.query(query, [number]);
  }

    const user = result.rows[0];
    const sessionData = { userId: user.user_id };
    const encryptedSessionData = encrypt(sessionData)
  
    const cookie = serialize('session', encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
    res.status(200).json({ message: 'Login Successfull', userId: user.user_id })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
