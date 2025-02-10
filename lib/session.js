import crypto from 'crypto';

const SECRET_KEY = process.env.NEXT_PUBLIC_SESSION_SECRET;


export function encrypt(data) {
    const iv = crypto.randomBytes(16); // Initialization Vector (IV)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), iv);

    let encrypted = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted; // Store IV with encrypted data
}


export function decrypt(encryptedData) {
    const [iv, encrypted] = encryptedData.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), Buffer.from(iv, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return JSON.parse(decrypted); // Convert back to object
}
