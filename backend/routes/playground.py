from fastapi import APIRouter, HTTPException, Header, UploadFile, File
from pydantic import BaseModel
from typing import List, Dict, Optional
from services.a4f_service import A4FService
import logging

logger = logging.getLogger(__name__)
router = APIRouter()
a4f_service = A4FService()

class ChatRequest(BaseModel):
    model: str
    messages: List[Dict[str, str]]
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1000

class ImageRequest(BaseModel):
    model: str
    prompt: str
    size: Optional[str] = "1024x1024"
    n: Optional[int] = 1

class AudioGenerationRequest(BaseModel):
    model: str
    input: str
    voice: Optional[str] = "alloy"

@router.post("/playground/text")
async def text_completion(
    request: ChatRequest,
    x_api_key: Optional[str] = Header(None)
):
    """
    Process text completion using a4f API
    """
    if not x_api_key:
        raise HTTPException(status_code=401, detail="API key required. Please add your a4f.co API key.")
    
    try:
        result = a4f_service.chat_completion(
            api_key=x_api_key,
            model=request.model,
            messages=request.messages,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        return result
    except Exception as e:
        logger.error(f"Text completion error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/playground/image")
async def image_generation(
    request: ImageRequest,
    x_api_key: Optional[str] = Header(None)
):
    """
    Generate image using a4f API
    """
    if not x_api_key:
        raise HTTPException(status_code=401, detail="API key required. Please add your a4f.co API key.")
    
    try:
        result = a4f_service.image_generation(
            api_key=x_api_key,
            model=request.model,
            prompt=request.prompt,
            size=request.size,
            n=request.n
        )
        return result
    except Exception as e:
        logger.error(f"Image generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/playground/audio/transcribe")
async def audio_transcription(
    file: UploadFile = File(...),
    model: str = "whisper-1",
    x_api_key: Optional[str] = Header(None)
):
    """
    Transcribe audio using a4f API
    """
    if not x_api_key:
        raise HTTPException(status_code=401, detail="API key required. Please add your a4f.co API key.")
    
    try:
        file_data = await file.read()
        result = a4f_service.audio_transcription(
            api_key=x_api_key,
            model=model,
            file_data=(file.filename, file_data, file.content_type)
        )
        return result
    except Exception as e:
        logger.error(f"Audio transcription error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/playground/audio/generate")
async def audio_generation(
    request: AudioGenerationRequest,
    x_api_key: Optional[str] = Header(None)
):
    """
    Generate audio using a4f API
    """
    if not x_api_key:
        raise HTTPException(status_code=401, detail="API key required. Please add your a4f.co API key.")
    
    try:
        audio_data = a4f_service.audio_generation(
            api_key=x_api_key,
            model=request.model,
            input_text=request.input,
            voice=request.voice
        )
        
        from fastapi.responses import Response
        return Response(content=audio_data, media_type="audio/mpeg")
    except Exception as e:
        logger.error(f"Audio generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))