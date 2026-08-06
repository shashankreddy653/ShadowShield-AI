def calculate(score):

    score = max(0, min(score, 100))

    if score >= 80:
        return score, "Low"

    if score >= 50:
        return score, "Medium"

    return score, "High"