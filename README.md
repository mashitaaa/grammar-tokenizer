# Grammar Tokenizer Web

Anggota **Kelompok 5** :

- Kartika Nana Naulita (5025241021)  
- Safa Mashita (5025241022)  
- Acquirell Kriswanto (5025241035)

Program ini dibuat untuk memenuhi tugas **Praktikum PPT 2** pada kelas **Otomata A**. Tujuan dari program ini adalah untuk memahami proses dasar dalam analisis teks program, khususnya pada tahap **tokenisasi** dan **klasifikasi token**.

Melalui program ini, pengguna dapat memasukkan potongan kode program, kemudian sistem akan memecah kode tersebut menjadi token-token kecil dan mengelompokkannya ke dalam beberapa kategori seperti **reserve words**, **simbol atau tanda baca**, **variabel**, serta **kalimat matematika**.

Program ini dibuat dalam bentuk aplikasi web sederhana sehingga dapat langsung dijalankan melalui browser tanpa perlu instalasi tambahan.

---

## Tentang Program

Grammar Tokenizer Web adalah program yang membaca potongan kode program yang dimasukkan oleh pengguna, lalu memecahnya menjadi token dan mengelompokkan token tersebut berdasarkan jenisnya.

Beberapa kategori token yang dideteksi dalam program ini antara lain:

- **Reserve Words**
- **Simbol dan Tanda Baca**
- **Variabel**
- **Kalimat Matematika**

Program ini bertujuan untuk memberikan gambaran sederhana tentang bagaimana proses awal analisis kode program dilakukan dalam bidang **compiler** atau **text processing**.

---

## Cara Menjalankan Program

1. Buka file `index.html` menggunakan browser (Chrome, Edge, atau browser lainnya).
2. Masukkan atau tempel kode program ke dalam area input yang tersedia.
3. Klik tombol **Analisis Token** untuk melihat hasil klasifikasi token.
4. Jika ingin mencoba contoh cepat, klik tombol **Isi Contoh** untuk menampilkan kode contoh secara otomatis.

---

## Teknologi yang Digunakan

Program ini dibuat menggunakan teknologi web dasar:

- **HTML** untuk struktur halaman
- **CSS** untuk tampilan antarmuka
- **JavaScript (Vanilla JS)** untuk proses tokenisasi dan klasifikasi token

Karena menggunakan JavaScript tanpa framework tambahan, program ini dapat dijalankan langsung dari browser.

---

## Cara Kerja Program

Program akan membaca teks kode yang dimasukkan oleh pengguna, kemudian memecahnya menjadi bagian-bagian kecil yang disebut **token** menggunakan **regular expression**.

Setelah token ditemukan, program akan mengelompokkannya ke dalam beberapa kategori:

**Reserve Words**  
Token yang termasuk kata kunci bahasa pemrograman umum seperti `if`, `for`, `while`, `return`, dan lain-lain.

**Simbol dan Tanda Baca**  
Berisi operator dan delimiter seperti `+`, `-`, `*`, `/`, `=`, `{}`, `()`, `;`, dan simbol lainnya.

**Variabel**  
Token yang mengikuti pola identifier seperti `[A-Za-z_]\w*` dan bukan termasuk reserve word.

**Kalimat Matematika**  
Baris kode yang mengandung operasi matematika atau fungsi matematika serta memiliki angka atau variabel di dalamnya.

---