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
            You are an advanced AI Resume Analysis and Matching System, similar to a next-generation ATS (Applicant Tracking System).
            Your goal is to compare a candidate’s RESUME with a JOB DESCRIPTION (JD) and provide a highly detailed, structured, and quantifiable analysis.

            Perform a deep comparison considering:
            - Skill overlap and gaps
            - Experience relevance and project alignment
            - Education and certifications fit
            - Domain expertise and role-level suitability
            - Keyword density and semantic relevance
            - Tone, professionalism, and clarity of the resume
            - Career progression and growth trajectory
            - Potential for future roles and learning agility

            Return the output STRICTLY in valid JSON format using the structure below.
            Ensure proper JSON syntax (no trailing commas, no markdown, no comments):

            {{
            "ats_overall_score": <integer from 0 to 100>,
            "match_summary": "<3-5 line summary comparing the resume and JD>",

            "category_scores": {{
                "skills_match_score": <integer 0-100>,
                "experience_relevance_score": <integer 0-100>,
                "education_fit_score": <integer 0-100>,
                "project_alignment_score": <integer 0-100>,
                "domain_expertise_score": <integer 0-100>,
                "soft_skills_score": <integer 0-100>,
                "communication_clarity_score": <integer 0-100>,
                "career_progression_score": <integer 0-100>
            }},

            "keyword_analysis": {{
                "matched_keywords": ["<keyword1>", "<keyword2>", "..."],
                "missing_keywords": ["<keyword1>", "<keyword2>", "..."],
                "keyword_density_percentage": <float>,
                "critical_missing_keywords": ["<keyword1>", "<keyword2>", "..."]
            }},

            "experience_analysis": {{
                "total_years_experience": "<detected years>",
                "relevant_experience_summary": "<summary of relevant experience>",
                "project_relevance": ["<brief project1>", "<brief project2>", "..."],
                "industry_match_score": <integer 0-100>,
                "career_trajectory": "<describe career progression>"
            }},

            "education_and_certifications": {{
                "highest_degree": "<degree>",
                "relevant_certifications": ["<cert1>", "<cert2>", "..."],
                "missing_recommended_certifications": ["<cert1>", "<cert2>", "..."]
            }},

            "skills_breakdown": {{
                "technical_skills_matched": ["<skill1>", "<skill2>", "..."],
                "technical_skills_missing": ["<skill1>", "<skill2>", "..."],
                "soft_skills_matched": ["<skill1>", "<skill2>", "..."],
                "soft_skills_missing": ["<skill1>", "<skill2>", "..."]
            }},

            "tone_and_language_analysis": {{
                "tone": "<professional | informal | overly generic>",
                "clarity_level": "<clear | moderate | poor>",
                "action_oriented_phrases": ["<phrase1>", "<phrase2>", "..."],
                "passive_phrases_to_avoid": ["<phrase1>", "<phrase2>", "..."]
            }},

            "improvement_suggestions": {{
                "resume_formatting_tips": ["<tip1>", "<tip2>", "..."],
                "content_enhancement_tips": ["<tip1>", "<tip2>", "..."],
                "skills_to_learn": ["<skill1>", "<skill2>", "..."],
                "recommended_certifications": ["<cert1>", "<cert2>", "..."],
                "project_areas_to_expand": ["<project area1>", "<project area2>", "..."]
            }},

            "final_evaluation": {{
                "overall_fit": "<Strong Fit | Moderate Fit | Weak Fit>",
                "fit_reasoning": "<short justification>",
                "suggested_role_level": "<Intern | Junior | Mid-level | Senior | Lead>",
                "potential_next_steps": ["<suggestion1>", "<suggestion2>"]
            }}
            }}

            Analyze carefully and respond ONLY with the valid JSON object — 
            no markdown, no explanations, no commentary.

            Now analyze the following:

            Job Description:
            {job_description}

            Candidate Resume:
            {resume_text}
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



'''

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





'''