// Mock data for AI models
export const mockModels = [
  {
    "base_model": "deepseek-v3",
    "name": "deepseek-v3",
    "description": "Advanced LLM with efficient architecture & high performance.",
    "logoUrl": "https://api.a4f.co/v1/logos/deepseek.svg",
    "type": "chat/completion",
    "context_window": 81920,
    "tier": "free",
    "category": "text",
    "proxy_providers": [
      {
        "id": "provider-3/deepseek-v3",
        "prefix": "provider-3",
        "owned_by": "DeepSeek",
        "features": ["vision", "function_calling"],
        "performance_metrics": {
          "latency": "3-6",
          "throughput": 33,
          "uptime_percentage": "97.23"
        }
      }
    ],
    "features": ["vision", "function_calling"]
  },
  {
    "base_model": "gpt-4o",
    "name": "GPT-4o",
    "description": "OpenAI's most advanced multimodal model with vision capabilities.",
    "logoUrl": "https://api.a4f.co/v1/logos/openai.svg",
    "type": "chat/completion",
    "context_window": 128000,
    "tier": "pro",
    "category": "text",
    "proxy_providers": [
      {
        "id": "provider-1/gpt-4o",
        "prefix": "provider-1",
        "owned_by": "OpenAI",
        "features": ["vision", "function_calling"],
        "performance_metrics": {
          "latency": "2-4",
          "throughput": 45,
          "uptime_percentage": "99.5"
        }
      }
    ],
    "features": ["vision", "function_calling"]
  },
  {
    "base_model": "claude-3-opus",
    "name": "Claude 3 Opus",
    "description": "Anthropic's most powerful model for complex tasks.",
    "logoUrl": "https://api.a4f.co/v1/logos/anthropic.svg",
    "type": "chat/completion",
    "context_window": 200000,
    "tier": "pro",
    "category": "text",
    "proxy_providers": [
      {
        "id": "provider-2/claude-3-opus",
        "prefix": "provider-2",
        "owned_by": "Anthropic",
        "features": ["vision"],
        "performance_metrics": {
          "latency": "3-5",
          "throughput": 38,
          "uptime_percentage": "98.7"
        }
      }
    ],
    "features": ["vision"]
  },
  {
    "base_model": "dall-e-3",
    "name": "DALL-E 3",
    "description": "Advanced text-to-image generation with high quality outputs.",
    "logoUrl": "https://api.a4f.co/v1/logos/openai.svg",
    "type": "image/generation",
    "context_window": 4000,
    "tier": "basic",
    "category": "image",
    "proxy_providers": [
      {
        "id": "provider-1/dall-e-3",
        "prefix": "provider-1",
        "owned_by": "OpenAI",
        "features": ["image_generation"],
        "performance_metrics": {
          "latency": "5-8",
          "throughput": 20,
          "uptime_percentage": "97.0"
        }
      }
    ],
    "features": ["image_generation"]
  },
  {
    "base_model": "stable-diffusion-xl",
    "name": "Stable Diffusion XL",
    "description": "High-resolution image generation with artistic control.",
    "logoUrl": "https://api.a4f.co/v1/logos/stability.svg",
    "type": "image/generation",
    "context_window": 2048,
    "tier": "free",
    "category": "image",
    "proxy_providers": [
      {
        "id": "provider-3/sdxl",
        "prefix": "provider-3",
        "owned_by": "Stability AI",
        "features": ["image_generation"],
        "performance_metrics": {
          "latency": "4-7",
          "throughput": 25,
          "uptime_percentage": "96.5"
        }
      }
    ],
    "features": ["image_generation"]
  },
  {
    "base_model": "whisper-large",
    "name": "Whisper Large V3",
    "description": "Automatic speech recognition and transcription.",
    "logoUrl": "https://api.a4f.co/v1/logos/openai.svg",
    "type": "audio/transcription",
    "context_window": 0,
    "tier": "basic",
    "category": "audio",
    "proxy_providers": [
      {
        "id": "provider-1/whisper-large",
        "prefix": "provider-1",
        "owned_by": "OpenAI",
        "features": ["transcription"],
        "performance_metrics": {
          "latency": "2-3",
          "throughput": 50,
          "uptime_percentage": "98.9"
        }
      }
    ],
    "features": ["transcription"]
  },
  {
    "base_model": "tts-1",
    "name": "TTS-1",
    "description": "Text-to-speech synthesis with natural voices.",
    "logoUrl": "https://api.a4f.co/v1/logos/openai.svg",
    "type": "audio/generation",
    "context_window": 4096,
    "tier": "basic",
    "category": "audio",
    "proxy_providers": [
      {
        "id": "provider-1/tts-1",
        "prefix": "provider-1",
        "owned_by": "OpenAI",
        "features": ["speech_generation"],
        "performance_metrics": {
          "latency": "1-2",
          "throughput": 60,
          "uptime_percentage": "99.2"
        }
      }
    ],
    "features": ["speech_generation"]
  },
  {
    "base_model": "gemini-pro",
    "name": "Gemini Pro",
    "description": "Google's powerful multimodal AI model.",
    "logoUrl": "https://api.a4f.co/v1/logos/google.svg",
    "type": "chat/completion",
    "context_window": 32768,
    "tier": "free",
    "category": "text",
    "proxy_providers": [
      {
        "id": "provider-2/gemini-pro",
        "prefix": "provider-2",
        "owned_by": "Google",
        "features": ["vision", "function_calling"],
        "performance_metrics": {
          "latency": "2-5",
          "throughput": 40,
          "uptime_percentage": "98.0"
        }
      }
    ],
    "features": ["vision", "function_calling"]
  },
  {
    "base_model": "llama-3-70b",
    "name": "Llama 3 70B",
    "description": "Meta's open-source large language model.",
    "logoUrl": "https://api.a4f.co/v1/logos/meta.svg",
    "type": "chat/completion",
    "context_window": 8192,
    "tier": "free",
    "category": "text",
    "proxy_providers": [
      {
        "id": "provider-3/llama-3-70b",
        "prefix": "provider-3",
        "owned_by": "Meta",
        "features": ["function_calling"],
        "performance_metrics": {
          "latency": "3-6",
          "throughput": 35,
          "uptime_percentage": "97.5"
        }
      }
    ],
    "features": ["function_calling"]
  },
  {
    "base_model": "mistral-large",
    "name": "Mistral Large",
    "description": "High-performance language model with multilingual support.",
    "logoUrl": "https://api.a4f.co/v1/logos/mistral.svg",
    "type": "chat/completion",
    "context_window": 32000,
    "tier": "basic",
    "category": "text",
    "proxy_providers": [
      {
        "id": "provider-2/mistral-large",
        "prefix": "provider-2",
        "owned_by": "Mistral AI",
        "features": ["function_calling"],
        "performance_metrics": {
          "latency": "2-4",
          "throughput": 42,
          "uptime_percentage": "98.3"
        }
      }
    ],
    "features": ["function_calling"]
  }
];