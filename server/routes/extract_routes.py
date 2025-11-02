from fastapi import File, Form, HTTPException, UploadFile, APIRouter
from utils.logger_manager import LoggerManager 
from utils.response_handler import standard_json_response
from services import PDFTextExtractor, AnalyzerEngine


logger = LoggerManager(__name__)

extract_router = APIRouter(tags=['Extract'])


@extract_router.post("/user_data")
async def extract_user_data(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Accepts a user-uploaded resume (PDF) and a job description string.
    Extracts text from the PDF after validating its type and size.
    Returns both extracted resume text and provided JD.
    """
    extractor = PDFTextExtractor()

    try:
        # Validate PDF type and size inside extractor
        extracted_text = extractor.extract_text(file.file, file.content_type)

        analyzer = AnalyzerEngine()
        llm_response = analyzer.llm_insights(resume_text=extracted_text, job_description=job_description)

        print(llm_response)

        return standard_json_response(
            status_code=200,
            success=True,
            message="Resume text extracted successfully",
            data=llm_response
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")