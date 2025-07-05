const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'newpassword', // GANTI DENGAN PASSWORD MYSQL ANDA JIKA ADA
  database: 'cv_database'
};

const JWT_SECRET = 'kunci-rahasia-super-aman-yang-harus-diganti-segera';

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username dan password diperlukan.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Username atau password salah.' });
    }
    const user = rows[0];
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '8h' });
      res.json({ success: true, message: 'Login berhasil!', token });
    } else {
      res.status(401).json({ success: false, message: 'Username atau password salah.' });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  } finally {
    if (connection) await connection.end();
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/api/cv-data', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [about] = await connection.query('SELECT * FROM about LIMIT 1');
    const [experiences] = await connection.query('SELECT * FROM experiences ORDER BY id');
    const [educations] = await connection.query('SELECT * FROM educations ORDER BY id');
    const [skills] = await connection.query('SELECT * FROM skills ORDER BY id');
    const [contacts] = await connection.query('SELECT * FROM contacts LIMIT 1');
    await connection.end();
    res.json({
      about: about[0] || {},
      experiences: experiences || [],
      educations: educations || [],
      skills: skills || [],
      contacts: contacts[0] || {}
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data CV', error: error.message });
  }
});

const createUpdateHandler = (tableName, fields) => async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.beginTransaction();
    const data = Array.isArray(req.body) ? req.body : [req.body];
    if (tableName !== 'about' && tableName !== 'contacts') {
      await connection.query(`DELETE FROM ${tableName}`);
    }
    for (const item of data) {
      const values = fields.map(field => item[field]);
      if ((tableName === 'about' || tableName === 'contacts') && data.length > 0) {
        await connection.query(`UPDATE ${tableName} SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE id = 1`, values);
      } else if (tableName !== 'about' && tableName !== 'contacts') {
        const placeholders = fields.map(() => '?').join(',');
        await connection.query(`INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${placeholders})`, values);
      }
    }
    await connection.commit();
    res.json({ message: `${tableName} berhasil diperbarui` });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: `Gagal memperbarui ${tableName}`, error: error.message });
  } finally {
    await connection.end();
  }
};

app.put('/api/about', verifyToken, createUpdateHandler('about', ['content']));
app.put('/api/experiences', verifyToken, createUpdateHandler('experiences', ['title', 'subtitle', 'description']));
app.put('/api/educations', verifyToken, createUpdateHandler('educations', ['institution', 'major', 'period']));
app.put('/api/skills', verifyToken, createUpdateHandler('skills', ['name', 'category']));
app.put('/api/contacts', verifyToken, createUpdateHandler('contacts', ['linkedin_url', 'github_url']));

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend server berjalan di http://localhost:${PORT}`));