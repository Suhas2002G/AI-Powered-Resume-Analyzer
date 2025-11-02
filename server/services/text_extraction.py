import logging
from typing import IO
import pdfplumber
from utils.logger_manager import LoggerManager

logger = LoggerManager(__name__)

class PDFTextExtractor:
    """
    A service class for extracting text from uploaded PDF files.
    Ensures file validation (type & size) before extraction.
    """

    # Global Variables
    MAX_FILE_SIZE_MB = 2
    ALLOWED_CONTENT_TYPE = "application/pdf"

    def extract_text(self, pdf_file: IO[bytes], content_type: str) -> str:
        """
        Extracts text from an uploaded PDF file after validation.

        Args:
            pdf_file (IO[bytes]): The uploaded PDF file (e.g., FastAPI's UploadFile.file).
            content_type (str): MIME type of the uploaded file (e.g., 'application/pdf').

        Returns:
            str: Extracted text content from the PDF.

        Raises:
            ValueError: If file type or size validation fails, or if no text found.
            Exception: For unexpected extraction errors.
        """
        # Validate content type
        if content_type != self.ALLOWED_CONTENT_TYPE:
            logger.error(f"Invalid file type: {content_type}")
            raise ValueError("Only PDF files are allowed.")

        # Validate file size (must be < 2 MB)
        pdf_file.seek(0, 2)  # move cursor to end
        file_size_mb = pdf_file.tell() / (1024 * 1024)
        pdf_file.seek(0)  # reset cursor

        if file_size_mb > self.MAX_FILE_SIZE_MB:
            logger.error(f"File size {file_size_mb:.2f} MB exceeds 2 MB limit.")
            raise ValueError("PDF file size exceeds 2 MB limit.")

        # Extract text
        all_text = []
        try:
            with pdfplumber.open(pdf_file) as pdf:
                for page_number, page in enumerate(pdf.pages, start=1):
                    text = page.extract_text()
                    if text:
                        all_text.append(text)
                    else:
                        logger.warning(f"No text found on page {page_number}")

            if not all_text:
                raise ValueError("No extractable text found in the PDF.")

            logger.info("Successfully extracted text from uploaded PDF.")
            return "\n".join(all_text)

        except Exception as e:
            logger.exception("Error during PDF text extraction.")
            raise e