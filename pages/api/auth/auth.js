import { parse } from 'cookie';
import { decrypt } from '../../../lib/session';
import pool from '../../../app/database/postgres';


export default async function getUserFromSession(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    return null;
  }

  const sessionData = decrypt(sessionCookie);

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [sessionData.userId]);

    if (!result.rows.length) {
      return res.status(401).json({ isAuthenticated: false });
    }

    return res.status(200).json({ isAuthenticated: true, user: result.rows[0]});
  } catch (error) {
    console.error('Error fetching user from session:', error);
    return res.status(500).json({ isAuthenticated: false });
  }

}