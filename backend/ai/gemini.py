import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load model
model = genai.GenerativeModel("gemini-2.5-flash")


def explain(url: str, score: int, risk: str, reasons: list):

    prompt = f"""
You are an expert cybersecurity analyst.

Analyze the following website scan.

URL:
{url}

Security Score:
{score}/100

Risk Level:
{risk}

Detected Issues:
{chr(10).join("- " + r for r in reasons)}

Explain:
1. Why this website received this score.
2. Whether the user should trust it.
3. Give simple cybersecurity advice.

Keep the explanation under 120 words.
Return only the explanation.
"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        return f"AI explanation unavailable: {str(e)}"