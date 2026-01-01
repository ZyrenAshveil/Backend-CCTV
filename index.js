import express from "express";
import { spawn } from "child_process";
import path from "path";

const app = express();
const PORT = 3000;

// RTSP URL (INI YANG BENAR)
const RTSP_URL = "rtsp://192.168.1.30:554/stream1";

// path ke ffmpeg.exe
const FFMPEG_PATH = path.resolve("./ffmpeg.exe");

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

// Capture 1 frame from RTSP
app.get("/capture", (req, res) => {
  const ffmpeg = spawn(FFMPEG_PATH, [
    "-rtsp_transport",
    "tcp",
    "-i",
    RTSP_URL,
    "-frames:v",
    "1",
    "-f",
    "image2",
    "-vcodec",
    "mjpeg",
    "-",
  ]);

  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Cache-Control", "no-store");

  ffmpeg.stdout.pipe(res);

  ffmpeg.stderr.on("data", () => {}); // suppress logs

  ffmpeg.on("error", (err) => {
    console.error("FFmpeg error:", err);
    res.status(500).end();
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running http://localhost:${PORT}`);
  console.log(`📸 Capture endpoint http://localhost:${PORT}/capture`);
});
