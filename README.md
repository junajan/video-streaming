# Modern Stream Player 🎬

A lightweight, privacy-focused web application that allows you to stream local video files directly in your browser with full subtitle support. No files are ever uploaded to a server; everything happens locally using the browser's Blob and URL APIs.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## ✨ Features

- **Local Streaming:** Play any video file supported by your browser (MP4, WebM, OGG).
- **Subtitle Support:** Attach `.vtt` or `.srt` files. 
- **Auto-Conversion:** Automatically converts legacy `.srt` subtitles to the modern `.vtt` format on-the-fly.
- **Interactive UI:** 
  - Drag-and-drop support for both videos and subtitles.
  - Modern dark-mode interface.
  - Responsive design.
- **Privacy First:** Your media stays on your computer. No data is sent to any external server.

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/junajan/video-streaming.git
   cd video-streaming
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 How to Use

1. **Select Video:** Click "Choose Video" or simply drag and drop a video file onto the player area.
2. **Add Subtitles:** Click "Choose Subtitles" or drag an `.srt` or `.vtt` file onto the subtitle selector.
3. **Control:** Use the standard player controls to play, pause, seek, and toggle subtitles.

## 🛠️ Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Bundler:** Vite
- **Styling:** Vanilla CSS (Modern CSS Variables & Flexbox)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
