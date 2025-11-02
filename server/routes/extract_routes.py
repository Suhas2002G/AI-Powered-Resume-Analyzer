from fastapi import APIRouter, File, HTTPException, UploadFile
from utils.logger_manager import LoggerManager 
from utils.response_handler import standard_json_response
from services import PDFTextExtractor


logger = LoggerManager(__name__)

extract_router = APIRouter(tags=['Extract'])


@extract_router.post('/user_data')
async def extract_pdf_text(file: UploadFile = File(...)):
    try:
        extractor = PDFTextExtractor()
        extracted_text = extractor.extract_text(file.file)
        
        return standard_json_response(
            status_code=200,
            success=True,
            data=extracted_text,
            message='Text Extracted Successfully',
            metadata=file.filename
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")