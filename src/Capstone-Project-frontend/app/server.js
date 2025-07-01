const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept only video files
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  }
});

// Store video metadata
let videos = [
  {
    id: 1,
    title: "Blockchain Fundamentals - Introduction",
    filename: "sample-video-1.mp4",
    url: "/uploads/sample-video-1.mp4",
    size: "15.2 MB",
    duration: "5:30",
    uploadDate: "2025-01-15",
    course: "Blockchain Fundamentals",
    description: "Introduction to blockchain technology and its core concepts"
  },
  {
    id: 2,
    title: "Smart Contracts - Solidity Basics",
    filename: "sample-video-2.mp4",
    url: "/uploads/sample-video-2.mp4",
    size: "28.7 MB",
    duration: "12:45",
    uploadDate: "2025-01-16",
    course: "Smart Contract Development",
    description: "Learn the basics of Solidity programming language"
  }
];

// Routes

// Upload video endpoint
app.post('/api/upload-video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No video file provided'
      });
    }

    const file = req.file;
    const videoData = {
      id: videos.length + 1,
      title: req.body.title || `Video ${videos.length + 1}`,
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      duration: req.body.duration || "Unknown",
      uploadDate: new Date().toISOString().split('T')[0],
      course: req.body.course || "Unassigned",
      description: req.body.description || ""
    };

    videos.push(videoData);

    res.json({
      success: true,
      video: videoData,
      message: 'Video uploaded successfully!'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all videos
app.get('/api/videos', (req, res) => {
  res.json({
    success: true,
    videos: videos
  });
});

// Get video by ID
app.get('/api/videos/:id', (req, res) => {
  const video = videos.find(v => v.id === parseInt(req.params.id));
  if (video) {
    res.json({
      success: true,
      video: video
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Video not found'
    });
  }
});

// Update video metadata
app.put('/api/videos/:id', (req, res) => {
  const videoIndex = videos.findIndex(v => v.id === parseInt(req.params.id));
  if (videoIndex !== -1) {
    videos[videoIndex] = {
      ...videos[videoIndex],
      ...req.body,
      id: parseInt(req.params.id) // Ensure ID doesn't change
    };
    res.json({
      success: true,
      video: videos[videoIndex]
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Video not found'
    });
  }
});

// Delete video
app.delete('/api/videos/:id', (req, res) => {
  const videoIndex = videos.findIndex(v => v.id === parseInt(req.params.id));
  if (videoIndex !== -1) {
    const video = videos[videoIndex];
    
    // Delete file from disk
    const filePath = path.join(uploadsDir, video.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    videos.splice(videoIndex, 1);
    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Video not found'
    });
  }
});

// Serve uploaded videos
app.use('/uploads', express.static(uploadsDir));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`🎥 Video upload endpoint: http://localhost:${PORT}/api/upload-video`);
  console.log(`📋 Video list endpoint: http://localhost:${PORT}/api/videos`);
}); 