from ai.gemini import model


def rewrite_text(text: str):

    prompt = f"""
You are a cybersecurity assistant.

Rewrite the following text professionally.

Requirements:
- Remove or generalize all sensitive information.
- Preserve the meaning.
- Return only the rewritten text.

Text:
{text}
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception:
        return text