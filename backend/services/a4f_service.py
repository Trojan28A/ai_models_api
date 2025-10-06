import requests
import os
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)

A4F_API_BASE = "https://api.a4f.co/v1"
A4F_DISPLAY_API = "https://www.a4f.co/api"

class A4FService:
    def __init__(self):
        self.base_url = A4F_API_BASE
        self.display_api = A4F_DISPLAY_API
    
    def get_display_models(self, plan: str = "free") -> Dict:
        """
        Fetch models from a4f.co display API
        """
        try:
            url = f"{self.display_api}/get-display-models?plan={plan}"
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            # Categorize models
            if 'models' in data:
                for model in data['models']:
                    model['category'] = self._categorize_model(model.get('type', ''))
                    model['tier'] = plan
            
            return data
        except Exception as e:
            logger.error(f"Error fetching models: {str(e)}")
            return {"models": []}
    
    def get_all_models(self) -> List[Dict]:
        """
        Fetch models from all tiers
        """
        all_models = []
        tiers = ['free', 'basic', 'pro', 'ultra']
        
        for tier in tiers:
            data = self.get_display_models(tier)
            if 'models' in data:
                all_models.extend(data['models'])
        
        return all_models
    
    def _categorize_model(self, model_type: str) -> str:
        """
        Categorize model based on type with more specific categories
        """
        model_type_lower = model_type.lower()
        
        # More specific categorization
        if 'speech' in model_type_lower or 'tts' in model_type_lower:
            return 'audio_speech'
        elif 'transcription' in model_type_lower or 'stt' in model_type_lower:
            return 'audio_transcription'
        elif 'audio' in model_type_lower:
            return 'audio_speech'  # Default audio to speech
        elif 'image' in model_type_lower and ('edit' in model_type_lower or 'variation' in model_type_lower):
            return 'image_edits'
        elif 'image' in model_type_lower or 'generation' in model_type_lower:
            return 'image_generation'
        elif 'video' in model_type_lower:
            return 'video'
        elif 'embedding' in model_type_lower:
            return 'embeddings'
        elif 'chat' in model_type_lower or 'completion' in model_type_lower or 'text' in model_type_lower:
            return 'chat_completion'
        else:
            return 'chat_completion'  # Default to chat completion
    
    def chat_completion(self, api_key: str, model: str, messages: List[Dict], **kwargs) -> Dict:
        """
        Make chat completion request to a4f API
        """
        try:
            url = f"{self.base_url}/chat/completions"
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": model,
                "messages": messages,
                **kwargs
            }
            
            response = requests.post(url, headers=headers, json=payload, timeout=60)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Chat completion error: {str(e)}")
            raise Exception(f"API request failed: {str(e)}")
    
    def image_generation(self, api_key: str, model: str, prompt: str, **kwargs) -> Dict:
        """
        Make image generation request to a4f API
        """
        try:
            url = f"{self.base_url}/images/generations"
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": model,
                "prompt": prompt,
                **kwargs
            }
            
            response = requests.post(url, headers=headers, json=payload, timeout=120)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Image generation error: {str(e)}")
            raise Exception(f"API request failed: {str(e)}")
    
    def audio_transcription(self, api_key: str, model: str, file_data, **kwargs) -> Dict:
        """
        Make audio transcription request to a4f API
        """
        try:
            url = f"{self.base_url}/audio/transcriptions"
            headers = {
                "Authorization": f"Bearer {api_key}"
            }
            
            files = {'file': file_data}
            data = {
                'model': model,
                **kwargs
            }
            
            response = requests.post(url, headers=headers, files=files, data=data, timeout=120)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Audio transcription error: {str(e)}")
            raise Exception(f"API request failed: {str(e)}")
    
    def audio_generation(self, api_key: str, model: str, input_text: str, **kwargs) -> bytes:
        """
        Make audio generation request to a4f API
        """
        try:
            url = f"{self.base_url}/audio/speech"
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": model,
                "input": input_text,
                **kwargs
            }
            
            response = requests.post(url, headers=headers, json=payload, timeout=120)
            response.raise_for_status()
            return response.content
        except requests.exceptions.RequestException as e:
            logger.error(f"Audio generation error: {str(e)}")
            raise Exception(f"API request failed: {str(e)}")