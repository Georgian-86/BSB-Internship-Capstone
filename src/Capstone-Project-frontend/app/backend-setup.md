# Video Storage & Backend Setup Guide

## 🎥 Video Storage Solutions

### 1. AWS S3 + CloudFront (Recommended)

#### Setup Steps:

1. **Create AWS Account**
   ```bash
   # Install AWS CLI
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install
   ```

2. **Configure AWS CLI**
   ```bash
   aws configure
   # Enter your AWS Access Key ID
   # Enter your AWS Secret Access Key
   # Enter your default region (e.g., us-east-1)
   ```

3. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://blockseblock-videos
   aws s3api put-bucket-cors --bucket blockseblock-videos --cors-configuration '{
     "CORSRules": [
       {
         "AllowedHeaders": ["*"],
         "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
         "AllowedOrigins": ["*"],
         "ExposeHeaders": []
       }
     ]
   }'
   ```

4. **Create CloudFront Distribution**
   - Go to AWS CloudFront Console
   - Create distribution
   - Origin: Your S3 bucket
   - Enable HTTPS
   - Set cache behaviors for video files

#### Backend Implementation (Node.js/Express):

```javascript
// server.js
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Upload video endpoint
app.post('/api/upload-video', upload.single('video'), async (req, res) => {
  try {
    const file = req.file;
    const fileName = `videos/${Date.now()}-${file.originalname}`;
    
    const params = {
      Bucket: 'blockseblock-videos',
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };
    
    const result = await s3.upload(params).promise();
    
    res.json({
      success: true,
      videoUrl: result.Location,
      fileName: fileName
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get video list endpoint
app.get('/api/videos', async (req, res) => {
  try {
    const params = {
      Bucket: 'blockseblock-videos',
      Prefix: 'videos/'
    };
    
    const result = await s3.listObjectsV2(params).promise();
    
    const videos = result.Contents.map(obj => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified,
      url: `https://your-cloudfront-domain.com/${obj.Key}`
    }));
    
    res.json(videos);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

### 2. Alternative: Cloudflare R2 (S3-Compatible, Often Cheaper)

#### Setup Steps:

1. **Create Cloudflare Account**
2. **Enable R2 Object Storage**
3. **Create R2 Bucket**
4. **Get API Tokens**

```javascript
// Using Cloudflare R2
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  endpoint: 'https://your-account-id.r2.cloudflarestorage.com',
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  region: 'auto',
  s3ForcePathStyle: true
});
```

### 3. Alternative: Google Cloud Storage

```javascript
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: 'path/to/service-account-key.json'
});

const bucket = storage.bucket('blockseblock-videos');
```

## 🔧 Frontend Integration

### Update the Video Upload Component:

```typescript
// In your VideoUpload component
const handleUpload = async () => {
  if (!selectedFile) return;

  setUploading(true);
  setUploadProgress(0);

  const formData = new FormData();
  formData.append('video', selectedFile);

  try {
    const response = await fetch('http://localhost:3001/api/upload-video', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    
    if (result.success) {
      onUploadComplete(result.videoUrl);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Upload failed. Please try again.');
  } finally {
    setUploading(false);
  }
};
```

## 📊 Cost Comparison

| Service | Storage Cost | Bandwidth Cost | Features |
|---------|-------------|----------------|----------|
| AWS S3 + CloudFront | $0.023/GB | $0.085/GB | Global CDN, High reliability |
| Cloudflare R2 | $0.015/GB | $0.00/GB | Free egress, S3-compatible |
| Google Cloud Storage | $0.020/GB | $0.12/GB | Good integration with Google services |
| Azure Blob Storage | $0.018/GB | $0.087/GB | Microsoft ecosystem |

## 🚀 Production Deployment

### Environment Variables:
```bash
# .env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=blockseblock-videos
CLOUDFRONT_DOMAIN=your-cloudfront-domain.com
```

### Security Best Practices:
1. **Use IAM Roles** instead of access keys in production
2. **Enable CORS** properly for your domain
3. **Set up CloudFront** for better performance
4. **Implement video transcoding** for multiple formats
5. **Add authentication** to upload endpoints

### Video Optimization:
```javascript
// Add video transcoding with AWS MediaConvert
const mediaConvert = new AWS.MediaConvert({
  apiVersion: '2017-08-29',
  endpoint: 'https://mediaconvert.us-east-1.amazonaws.com'
});

// Convert to multiple formats (MP4, WebM, HLS)
const jobParams = {
  Role: 'arn:aws:iam::account:role/MediaConvert_Role',
  Settings: {
    OutputGroups: [
      {
        Name: 'MP4',
        Outputs: [
          {
            NameModifier: '_720p',
            VideoDescription: {
              Width: 1280,
              Height: 720
            }
          }
        ]
      }
    ]
  }
};
```

## 🔒 Security Considerations

1. **File Validation**: Check file types and sizes
2. **Virus Scanning**: Implement malware detection
3. **Access Control**: Restrict uploads to authenticated users
4. **Rate Limiting**: Prevent abuse
5. **Content Moderation**: Review uploaded content

## 📱 Mobile Optimization

```javascript
// Progressive upload for large files
const uploadInChunks = async (file, chunkSize = 5 * 1024 * 1024) => {
  const chunks = Math.ceil(file.size / chunkSize);
  
  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    
    // Upload chunk
    await uploadChunk(chunk, i, chunks);
    
    // Update progress
    setUploadProgress((i + 1) / chunks * 100);
  }
};
```

This setup will give you a scalable, cost-effective video storage solution for your edtech platform! 