from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from services.a4f_service import A4FService
import logging

logger = logging.getLogger(__name__)
router = APIRouter()
a4f_service = A4FService()

@router.get("/models")
async def get_models(
    tier: Optional[str] = Query(None, description="Filter by tier: free, basic, pro"),
    category: Optional[str] = Query(None, description="Filter by category: text, image, audio, video")
):
    """
    Fetch all AI models from a4f.co
    """
    try:
        if tier:
            data = a4f_service.get_display_models(tier)
            models = data.get('models', [])
        else:
            models = a4f_service.get_all_models()
        
        # Apply category filter if provided
        if category and category != 'all':
            models = [m for m in models if m.get('category') == category]
        
        return {"models": models, "count": len(models)}
    except Exception as e:
        logger.error(f"Error fetching models: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/models/{model_name}")
async def get_model_by_name(model_name: str):
    """
    Get specific model details
    """
    try:
        models = a4f_service.get_all_models()
        model = next((m for m in models if m.get('base_model') == model_name or m.get('name') == model_name), None)
        
        if not model:
            raise HTTPException(status_code=404, detail="Model not found")
        
        return model
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching model: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))