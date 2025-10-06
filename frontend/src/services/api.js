import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const modelsAPI = {
  fetchModels: async (filters = {}) => {
    const params = {};
    if (filters.tier) params.tier = filters.tier;
    if (filters.category) params.category = filters.category;
    
    const response = await axios.get(`${API_BASE}/models`, { params });
    return response.data;
  },
  
  fetchModelByName: async (modelName) => {
    const response = await axios.get(`${API_BASE}/models/${modelName}`);
    return response.data;
  }
};

export const playgroundAPI = {
  textCompletion: async (apiKey, model, messages, options = {}) => {
    const response = await axios.post(
      `${API_BASE}/playground/text`,
      {
        model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 1000
      },
      {
        headers: {
          'X-API-Key': apiKey
        }
      }
    );
    return response.data;
  },
  
  imageGeneration: async (apiKey, model, prompt, options = {}) => {
    const response = await axios.post(
      `${API_BASE}/playground/image`,
      {
        model,
        prompt,
        size: options.size || '1024x1024',
        n: options.n || 1
      },
      {
        headers: {
          'X-API-Key': apiKey
        }
      }
    );
    return response.data;
  },
  
  audioTranscription: async (apiKey, model, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', model);
    
    const response = await axios.post(
      `${API_BASE}/playground/audio/transcribe`,
      formData,
      {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  },
  
  audioGeneration: async (apiKey, model, input, options = {}) => {
    const response = await axios.post(
      `${API_BASE}/playground/audio/generate`,
      {
        model,
        input,
        voice: options.voice || 'alloy'
      },
      {
        headers: {
          'X-API-Key': apiKey
        },
        responseType: 'blob'
      }
    );
    return response.data;
  }
};