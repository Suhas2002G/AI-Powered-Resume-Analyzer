import json
from fastapi import HTTPException
from groq import Groq
from core import settings
from utils.logger_manager import LoggerManager

logger = LoggerManager(__name__)

class AnalyzerEngine:
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.model = settings.GROK_MODEL
        self.client = Groq(api_key=self.api_key)
        logger.info("AnalyzerEngine initialized successfully")

    def llm_insights(self, resume_text: str, job_description: str):
        """
        Analyze the candidate's resume against the job description
        using the configured LLM model with ATS-style analysis.
        """
        try:
            prompt = f"""
            You are an advanced AI Resume Analyst, specialized in evaluating resumes against job descriptions,
            similar to an ATS (Applicant Tracking System). Analyze the provided resume text and job description
            thoroughly, and generate a structured JSON response.

            Your task:
            1. Compare the candidate’s resume with the given job description.
            2. Extract important insights based on keyword relevance, experience fit, skills, education, and achievements.
            3. Identify alignment with the job requirements and rate the candidate’s suitability.
            4. Provide a professional summary highlighting overall fit.

            Return the output **strictly in valid JSON format** with the following structure:

            {{
            "ats_score": <integer between 0-100 indicating how well the resume matches the JD>,
            "match_summary": "<2-3 line professional summary of overall match>",
            "matched_keywords": [ "<keyword1>", "<keyword2>", ... ],
            "missing_keywords": [ "<keyword1>", "<keyword2>", ... ],
            "core_strengths": [ "<strength1>", "<strength2>", ... ],
            "experience_alignment": {{
                "years_of_experience": "<detected years or range>",
                "relevant_experience": "<summary of relevant experience>",
                "industry_match_score": <integer between 0-100>
            }},
            "skill_gap_analysis": {{
                "technical_gaps": [ "<missing technical skill>", ... ],
                "soft_skill_gaps": [ "<missing soft skill>", ... ]
            }},
            "recommendations": {{
                "improvement_areas": [ "<specific suggestion>", ... ],
                "certifications_to_consider": [ "<certification or course>", ... ],
                "profile_summary_enhancement_tips": [ "<tip>", ... ]
            }},
            "final_verdict": "<one line statement on whether the candidate is a strong, moderate, or weak fit>"
            }}

            Now analyze the data below:

            Job Description:
            {job_description}

            Candidate Resume:
            {resume_text}

            Please output only the JSON response.
            """

            chat = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=self.model
            )

            response = chat.choices[0].message.content.strip()
            logger.info("LLM response received successfully")

            # Attempt to parse the response as JSON
            try:
                if response.startswith("```"):
                    response = response.strip("`").replace("json", "").strip()
                return json.loads(response)

            except json.JSONDecodeError:
                logger.warning("Response is not valid JSON. Returning raw text.")
                return {"raw_response": response}

        except Exception as e:
            logger.error(f"AnalyzerEngine.llm_insights failed: {e}")
            raise HTTPException(status_code=500, detail=f"Error analyzing text: {str(e)}")
        

# LLM RESPONSE 
'''
{
  "ats_score": 78,
  "match_summary": "The candidate shows strong alignment with backend development and Python-related roles but lacks cloud experience required in the JD.",
  "matched_keywords": ["Python", "FastAPI", "REST API", "MySQL", "Git"],
  "missing_keywords": ["AWS", "Docker", "CI/CD"],
  "core_strengths": ["Strong backend logic", "Clean code practices", "Good database understanding"],
  "experience_alignment": {
    "years_of_experience": "1.5 years",
    "relevant_experience": "Worked on Django and FastAPI projects with database integrations.",
    "industry_match_score": 80
  },
  "skill_gap_analysis": {
    "technical_gaps": ["Docker", "Kubernetes"],
    "soft_skill_gaps": ["Client communication"]
  },
  "recommendations": {
    "improvement_areas": ["Gain experience with AWS and Docker", "Work on DevOps basics"],
    "certifications_to_consider": ["AWS Cloud Practitioner", "Docker Essentials"],
    "profile_summary_enhancement_tips": ["Highlight achievements in backend scalability and performance improvements"]
  },
  "final_verdict": "Strong fit for backend developer role"
}


'''
