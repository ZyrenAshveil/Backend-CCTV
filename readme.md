# CCTV Backend – RTSP Snapshot Service

Backend service berbasis Express.js untuk mengambil 1 frame (snapshot) dari CCTV berbasis RTSP dan mengirimkannya ke Frontend melalui HTTP.

Project ini digunakan sebagai tahap awal sebelum implementasi OCR, vehicle detection, dan integrasi IoT.

---

## Arsitektur

[CCTV (RTSP)]  
↓  
[FFmpeg Decoder]  
↓  
[Express Backend]  
↓  
[Frontend / Browser]

---

## Fitur

- Health check endpoint
- Capture 1 frame dari RTSP CCTV
- Mengirim snapshot sebagai image/jpeg
- Belum OCR
- Belum streaming (snapshot only)

---

## Teknologi

- Node.js
- Express.js
- FFmpeg (static binary, tanpa install global)
- RTSP (CCTV stream)

---

## Struktur Project

Backend-CCTV/
- ffmpeg.exe
- index.js
- package.json
- README.md

---

## Prasyarat

- Node.js v18+
- CCTV dengan RTSP aktif
- FFmpeg binary (ffmpeg.exe) di root project

---

## Instalasi

npm install

Download FFmpeg static build:
https://www.gyan.dev/ffmpeg/builds/

Ambil file:
bin/ffmpeg.exe

Letakkan ffmpeg.exe di root project

---

## Konfigurasi

Edit index.js:

const RTSP_URL = "rtsp://192.168.1.30:554/stream1";

Sesuaikan dengan IP dan path RTSP kamera

---

## Menjalankan Server

node index.js

Server akan berjalan di:
http://localhost:3000

---

## Endpoint

GET /health

Response:
{
  "status": "ok",
  "time": "2026-01-01T20:13:40.515Z"
}

---

GET /capture

Response:
Content-Type: image/jpeg  
Body: snapshot dari CCTV

Akses via browser:
http://localhost:3000/capture

---

## Catatan Teknis

- RTSP tidak bisa langsung diakses browser
- RTSP harus didecode menggunakan FFmpeg
- Node.js tidak memiliki decoder video native
- FFmpeg dijalankan setiap request capture

---

## Limitasi

- Tidak ada caching frame
- Setiap request spawn FFmpeg process
- Belum ada rate limit
- Belum OCR atau AI

---

## Rencana Pengembangan

- Frame caching
- Rate limiting
- OCR plat nomor
- Integrasi ESP32
- Gate automation
- Dockerization

---

## Lisensi

MIT License
