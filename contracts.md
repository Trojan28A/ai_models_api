# API Contracts & Integration Plan

## Overview
This document outlines the API contracts for the AI Models Hub application and the plan for backend integration.

## Mock Data to Replace
Currently, the frontend uses mock data in `/app/frontend/src/mock.js`. This needs to be replaced with actual API calls:
- Mock model list with 10 sample models
- Mock playground responses for text, image, and audio

## API Endpoints

### 1. Models API

#### GET /api/models
Fetch all AI models from a4f.co API

**Query Parameters:**
- `plan` (optional): Filter by tier (free, basic, pro, ultra)
- `category` (optional): Filter by category (text, image, audio, video)

**Response:**
```json
{
  "models": [
    {
      "base_model": "string",
      "name": "string",
      "description": "string",
      "logoUrl": "string",
      "type": "string",
      "context_window": number,
      "tier": "free|basic|pro|ultra",
      "category": "text|image|audio|video",
      "proxy_providers": [...],
      "features": [...]
    }
  ]
}
```

#### GET /api/models/{model_id}
Get details for a specific model

**Response:** Single model object

### 2. Playground APIs (Future - requires API keys)

#### POST /api/playground/text
Process text completion requests

**Request:**
```json
{
  "model": "string",
  "messages": [{"role": "user|assistant", "content": "string"}],
  "max_tokens": number
}
```

**Response:**
```json
{
  "response": "string",
  "usage": {...}
}
```

#### POST /api/playground/image
Generate images from text

**Request:**
```json
{
  "model": "string",
  "prompt": "string",
  "size": "string"
}
```

**Response:**
```json
{
  "image_url": "string"
}
```

#### POST /api/playground/audio
Process audio (transcription or generation)

**Request:**
```json
{
  "model": "string",
  "input": "string",
  "type": "transcription|generation"
}
```

**Response:**
```json
{
  "output": "string"
}
```

## Backend Implementation Plan

### Phase 1: Model Data Fetching (Current)
1. Create service to fetch models from a4f.co API
2. Cache model data in MongoDB
3. Implement filtering and search
4. Replace frontend mock data with real API calls

### Phase 2: Playground Integration (Future)
1. Require user to provide API key
2. Implement secure key storage
3. Create proxy endpoints for each model type
4. Handle rate limiting and errors

## Frontend Integration

### Files to Update:
1. **Models.jsx**: Replace `mockModels` import with API call
2. **TextPlayground.jsx**: Connect to backend API endpoint
3. **ImagePlayground.jsx**: Connect to backend API endpoint
4. **AudioPlayground.jsx**: Connect to backend API endpoint

### API Service:
Create `/app/frontend/src/services/api.js`:
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const fetchModels = async (filters) => {
  const response = await axios.get(`${API_BASE}/models`, { params: filters });
  return response.data;
};
```

## Database Schema

### Models Collection
```javascript
{
  _id: ObjectId,
  base_model: String,
  name: String,
  description: String,
  logoUrl: String,
  type: String,
  context_window: Number,
  tier: String,
  category: String,
  proxy_providers: Array,
  features: Array,
  cached_at: Date,
  updated_at: Date
}
```

## Error Handling
- 404: Model not found
- 500: External API error
- 503: Service unavailable
- Rate limiting: 429 Too Many Requests

## Notes
- Model data should be cached and refreshed every 24 hours
- Playground features require user's API key (not implemented in MVP)
- All responses include proper CORS headers
- Implement request logging for debugging
