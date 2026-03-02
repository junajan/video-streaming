import React, { useState, useRef } from 'react';
import './App.css';
import { srtToVtt } from './utils/subtitleConverter';

function App() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [subtitleSrc, setSubtitleSrc] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [subtitleName, setSubtitleName] = useState<string | null>(null);
  
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [isDraggingSubtitle, setIsDraggingSubtitle] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const processVideoFile = (file: File) => {
    if (videoSrc) {
      URL.revokeObjectURL(videoSrc);
    }
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setVideoName(file.name);
  };

  const processSubtitleFile = async (file: File) => {
    if (subtitleSrc) {
      URL.revokeObjectURL(subtitleSrc);
    }

    try {
      let content = await file.text();
      
      if (file.name.toLowerCase().endsWith('.srt')) {
        content = srtToVtt(content);
      }

      const blob = new Blob([content], { type: 'text/vtt' });
      const url = URL.createObjectURL(blob);
      setSubtitleSrc(url);
      setSubtitleName(file.name);
    } catch (err) {
      console.error('Error loading subtitle:', err);
      alert('Failed to load subtitle file.');
    }
  };

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processVideoFile(file);
  };

  const handleSubtitleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processSubtitleFile(file);
  };

  // Drag and Drop Handlers
  const onDragOver = (e: React.DragEvent, setter: (val: boolean) => void) => {
    e.preventDefault();
    setter(true);
  };

  const onDragLeave = (e: React.DragEvent, setter: (val: boolean) => void) => {
    e.preventDefault();
    setter(false);
  };

  const onDrop = (e: React.DragEvent, processor: (file: File) => void, setter: (val: boolean) => void) => {
    e.preventDefault();
    setter(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processor(file);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Modern Stream Player</h1>
        <p>Your local media, your way.</p>
      </header>

      <div className="player-wrapper">
        {videoSrc ? (
          <video 
            ref={videoRef}
            controls 
            autoPlay 
            crossOrigin="anonymous"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc} type="video/ogg" />
            
            {subtitleSrc && (
              <track 
                kind="subtitles" 
                src={subtitleSrc} 
                srcLang="en" 
                label="Custom Subtitles" 
                default 
              />
            )}
            Your browser does not support the video tag.
          </video>
        ) : (
          <div 
            className={`empty-state ${isDraggingVideo ? 'dragging' : ''}`}
            onDragOver={(e) => onDragOver(e, setIsDraggingVideo)}
            onDragLeave={(e) => onDragLeave(e, setIsDraggingVideo)}
            onDrop={(e) => onDrop(e, processVideoFile, setIsDraggingVideo)}
          >
            <p>{isDraggingVideo ? "Drop to Play!" : "Select or drag a video file to start streaming."}</p>
          </div>
        )}

        <div className="controls-panel">
          <div 
            className={`file-input-group ${isDraggingVideo ? 'dragging' : ''}`}
            onDragOver={(e) => onDragOver(e, setIsDraggingVideo)}
            onDragLeave={(e) => onDragLeave(e, setIsDraggingVideo)}
            onDrop={(e) => onDrop(e, processVideoFile, setIsDraggingVideo)}
          >
            <label>Video File</label>
            <label className="custom-file-input">
              {isDraggingVideo ? "Drop it here!" : "Choose or Drag Video"}
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleVideoSelect} 
              />
            </label>
            {videoName && <span className="status-badge">{videoName}</span>}
          </div>

          <div 
            className={`file-input-group ${isDraggingSubtitle ? 'dragging' : ''}`}
            onDragOver={(e) => onDragOver(e, setIsDraggingSubtitle)}
            onDragLeave={(e) => onDragLeave(e, setIsDraggingSubtitle)}
            onDrop={(e) => onDrop(e, processSubtitleFile, setIsDraggingSubtitle)}
          >
            <label>Subtitle File (SRT/VTT)</label>
            <label className="custom-file-input">
              {isDraggingSubtitle ? "Drop it here!" : "Choose or Drag Subtitles"}
              <input 
                type="file" 
                accept=".srt,.vtt" 
                onChange={handleSubtitleSelect} 
              />
            </label>
            {subtitleName && <span className="status-badge">{subtitleName}</span>}
          </div>
        </div>
      </div>

      <footer style={{ marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
        <p>Built with React & Vanilla CSS - Stream local files privately in your browser.</p>
      </footer>
    </div>
  );
}

export default App;
