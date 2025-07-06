// File: server.cjs (Versi Baru - Base64)

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
// Tingkatkan limit agar bisa menerima data Base64 yang besar
app.use(express.json({ limit: '10mb' }));

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'newpassword', // SESUAIKAN JIKA PERLU
  database: 'cv_database'
};

const JWT_SECRET = 'kunci-rahasia-super-aman-yang-harus-diganti-segera';

// Rute Login
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
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  } finally {
    if (connection) await connection.end();
  }
});

// Middleware Token
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

// Rute GET Data, sekarang mengambil dari user_profile
app.get('/api/cv-data', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [profile] = await connection.query('SELECT * FROM user_profile WHERE id = 1 LIMIT 1');
    const [about] = await connection.query('SELECT * FROM about LIMIT 1');
    const [experiences] = await connection.query('SELECT * FROM experiences ORDER BY id');
    const [educations] = await connection.query('SELECT * FROM educations ORDER BY id');
    const [skills] = await connection.query('SELECT * FROM skills ORDER BY id');
    const [contacts] = await connection.query('SELECT * FROM contacts LIMIT 1');
    await connection.end();
    
    // Ganti nama field agar sesuai dengan frontend
    const heroData = profile[0] ? { name: profile[0].user_name, imageUrl: profile[0].user_avatar } : {};

    res.json({
      hero: heroData,
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

// RUTE UPDATE PROFIL BARU (METODE BASE64)
app.put('/api/profile', verifyToken, async (req, res) => {
  const { name, imageUrl } = req.body; 

  if (!name) {
    return res.status(400).json({ success: false, message: 'Nama tidak boleh kosong.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.query('SELECT user_avatar FROM user_profile WHERE id = 1');
    const oldAvatar = rows.length > 0 ? rows[0].user_avatar : null;
    
    const newAvatar = imageUrl || oldAvatar;
    
    const sqlQuery = 'UPDATE user_profile SET user_name = ?, user_avatar = ? WHERE id = 1';
    await connection.execute(sqlQuery, [name, newAvatar]);
    
    res.json({ success: true, message: 'Profil berhasil diperbarui!' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Database: ' + error.message });
  } finally {
    if (connection) await connection.end();
  }
});


// Ganti fungsi createUpdateHandler yang lama dengan yang ini
const createUpdateHandler = (tableName, fields) => async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.beginTransaction();

    // Logika untuk tabel yang hanya punya satu baris (UPDATE)
    if (tableName === 'about' || tableName === 'contacts') {
      const data = req.body;
      const values = fields.map(field => data[field]);
      const setClauses = fields.map(field => `${field} = ?`).join(', ');
      await connection.query(`UPDATE ${tableName} SET ${setClauses} WHERE id = 1`, values);
    } 
    // Logika untuk tabel yang punya banyak baris (DELETE lalu INSERT)
    else {
      const data = req.body; // Data dari frontend adalah array of objects
      
      // 1. Hapus semua data lama dari tabel
      await connection.query(`DELETE FROM ${tableName}`);
      
      // 2. Masukkan kembali semua data baru dari frontend
      if (data && data.length > 0) {
        for (const item of data) {
          // Pastikan item (baris data) yang dikirim tidak kosong
          if (Object.keys(item).length > 0 && fields.every(field => item[field] !== undefined)) { 
            const values = fields.map(field => item[field]);
            const placeholders = fields.map(() => '?').join(',');
            await connection.query(`INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${placeholders})`, values);
          }
        }
      }
    }

    await connection.commit();
    res.json({ message: `${tableName} berhasil diperbarui` });
  } catch (error) {
    await connection.rollback();
    console.error(`Error updating ${tableName}:`, error); // Log error di backend
    res.status(500).json({ message: `Gagal memperbarui ${tableName}`, error: error.message });
  } finally {
    if (connection) await connection.end();
  }
};
app.put('/api/about', verifyToken, createUpdateHandler('about', ['content']));
app.put('/api/experiences', verifyToken, createUpdateHandler('experiences', ['title', 'subtitle', 'description']));
app.put('/api/educations', verifyToken, createUpdateHandler('educations', ['institution', 'major', 'period']));
app.put('/api/skills', verifyToken, createUpdateHandler('skills', ['name', 'category']));
app.put('/api/contacts', verifyToken, createUpdateHandler('contacts', ['linkedin_url', 'github_url']));


const PORT = 3000;
app.listen(PORT, () => console.log(`Backend server berjalan di http://localhost:${PORT}`));