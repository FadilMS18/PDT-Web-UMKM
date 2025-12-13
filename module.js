
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors()); // Supaya browser boleh ambil data

// Koneksi Database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_umkm_pdt' // Pastikan nama DB benar sesuai phpMyAdmin
});

// Endpoint API (Pintu Masuk Data)
app.get('/api/produk', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM produk');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Menyalakan Server
app.listen(3000, () => {
    console.log('Server sedang berjalan di http://localhost:3000');
});