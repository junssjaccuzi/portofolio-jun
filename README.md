# 🎮 Portofolio Interaktif Senja — Rendra Adie Permana (Jun)

Portofolio web 2D interaktif bergaya **Side-Scrolling RPG / Game World** yang terinspirasi dari estetika dunia senja *amubhya* ("A Life in Progress"), disesuaikan khusus dengan identitas, keahlian, riwayat pendidikan, dan karya **Rendra Adie Permana (Jun)** — Full-Stack Developer & AI Specialist dari Kota Tasikmalaya.

---

## 🌟 Fitur Utama

1. **Dunia Game 2D Interaktif (10.800px):**
   - Latar belakang panorama senja berlapis (*Parallax Sky, Galunggung Mountain, Tasikmalaya Hills, Promenade Road*).
   - Efek atmosferik dinamis: kelopak bunga melayang tertiup angin (*sakura petals*), kunang-kunang menyala (*fireflies*), lentera malam bercahaya, dan pantulan air/tanah.
2. **Karakter Pemain (Jun):**
   - Karakter animasi kanvas dengan siklus jalan (*walk cycle*), arah hadap (*facing direction*), bayangan lantai, dan pantulan air.
   - Kontrol fleksibel: **Keyboard A/D atau Panah**, **Klik di mana saja pada layar**, atau **Virtual D-Pad Touch Controls** di ponsel/tablet.
3. **6 Halte / Pos Portofolio Utama:**
   - **Pos 01 — TENTANG (🚏):** Profil lengkap, bio, domisili Tasikmalaya, filosofi, stats, serta bar keahlian Machine Learning, Neural Networks, Next.js, Django, dan Cloud Systems.
   - **Pos 02 — PROYEK (⚡):** Showcase proyek unggulan (Neural Vision Classifier, Enterprise Next.js & Django, Scalable Cloud Microservices, Smart Analytics Suite).
   - **Pos 03 — PENDIDIKAN (📖):** Garis waktu perjalanan studi lengkap:
     * Universitas Perjuangan Tasikmalaya (Higher Education)
     * SMA Negeri 8 Tasikmalaya
     * SMP Negeri 4 Tasikmalaya
     * SD Negeri 1 Lewo
   - **Pos 04 — PENGALAMAN (☕):** Pengalaman riset & rekayasa sistem perangkat lunak, spesialisasi stack, dan arsitektur web modern.
   - **Pos 05 — PENGHARGAAN (🏆):** Rekognisi implementasi AI / Machine Learning, keunggulan arsitektur sistem, dan dedikasi berkelanjutan.
   - **Pos 06 — KONTAK (✉️):** Surel langsung (`junssjaccuzi@gmail.com`), fitur salin email instan, formulir kirim pesan interaktif, dan tautan sosial.
4. **6 NPC Interaktif:**
   - Karakter unik di sepanjang jalan: **Oren si Kucing 🐱, Maya 👩‍💻, Pak Tani 🌾, Gagak 🦅, Clara ☕, dan Ibu Warung 🍵**.
   - Sistem dialog teks ala RPG dengan suara blip ketikan dan cerita trivia menarik.
5. **Navigasi Cepat & Peta Dunia (Minimap):**
   - Bar **Fast Travel** di header untuk langsung melompat (*teleport*) ke halte mana pun dengan 1 klik (sangat ramah bagi HR / perekrut yang ingin cepat).
   - **Minimap radar** di bagian bawah yang memperlihatkan posisi pemain secara akurat di seluruh bentang dunia 10.800 meter.
6. **Synthesizer Audio Web (Sound Engine):**
   - Efek suara synthesizer sintetis (suara langkah kaki, lonceng halte, dengungan angin senja, blip percakapan NPC) tanpa membebani ukuran file aset eksternal.
   - Dilengkapi tombol ON/OFF Mute di sudut kanan atas.
7. **Layar Pembuka Reflektif (Loading Screen):**
   - Menampilkan kutipan inspiratif bertema *"A Life in Progress"*, bilah pemuatan, tombol pemilih bahasa (ID/EN), dan tombol *"Mulai Jelajahi Dunia"*.

---

## 🚀 Cara Menjalankan Proyek

### 1. Jalankan Server Pengembangan (Dev)
Buka terminal di folder ini dan ketik:
```bash
npm run dev
```
Buka browser di `http://localhost:3000` (atau port yang tertera di terminal).

### 2. Build untuk Produksi
```bash
npm run build
```
Hasil build yang optimal dan siap hosting akan berada di folder `dist/`.

---

## ✏️ Cara Mengubah / Menambah Data Anda

Semua data tersimpan rapi dalam satu file konfigurasi khusus:
👉 **`src/data/portfolioData.ts`**

Anda dapat membuka file tersebut untuk:
- Mengganti atau menambahkan link GitHub, LinkedIn, Instagram, atau nomor WhatsApp pada bagian `contact`.
- Menambah proyek baru pada array `projects`.
- Menambah keahlian atau tech stack baru pada `skillCategories`.
- Mengubah teks bio atau moto portofolio kapan saja.

---

## 🌐 Cara Deploy ke Internet (Gratis)

Anda bisa meng-upload portofolio ini secara gratis ke layanan seperti **Vercel**, **Netlify**, atau **GitHub Pages**:

### Deploy via Vercel (Rekomendasi & Paling Mudah):
1. Push folder proyek ini ke repositori GitHub Anda.
2. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
3. Klik **"Add New Project"**, lalu pilih repositori portofolio ini.
4. Vercel akan otomatis mendeteksi konfigurasi Vite dan menjalankannya secara instan!
