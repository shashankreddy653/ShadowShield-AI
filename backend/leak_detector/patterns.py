PATTERNS = {

    # ---------------- Passwords ----------------
    "Password": r"(?i)password\s*[:=]\s*[^\s,;]+",

    # ---------------- Emails ----------------
    "Email": r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+",

    # ---------------- Phone ----------------
    "Phone": r"\b(?:\+91[- ]?)?[6-9]\d{9}\b",

    # ---------------- Aadhaar ----------------
    "Aadhaar": r"\b\d{4}\s?\d{4}\s?\d{4}\b",

    # ---------------- PAN ----------------
    "PAN Card": r"\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b",

    # ---------------- Credit Card ----------------
    "Credit Card": r"\b(?:\d[ -]*?){13,16}\b",

    # ---------------- UPI ----------------
    "UPI ID": r"\b[\w.-]+@(upi|paytm|ybl|ibl|axl|oksbi|okicici|okaxis)\b",

    # ---------------- IPv4 ----------------
    "IP Address": r"\b(?:\d{1,3}\.){3}\d{1,3}\b",

    # ---------------- Google API ----------------
    "Google API Key": r"\bAIza[0-9A-Za-z\-_]{20,}\b",

    # ---------------- OpenAI ----------------
    "OpenAI API Key": r"sk-[A-Za-z0-9]{20,}",

    # ---------------- GitHub Token ----------------
    "GitHub Token": r"\bgh[pousr]_[A-Za-z0-9_]{20,}\b",

    # ---------------- AWS Access Key ----------------
    "AWS Access Key": r"AKIA[0-9A-Z]{16}",

    # ---------------- JWT ----------------
    "JWT Token": r"eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9._-]+\.[A-Za-z0-9._-]+",

    # ---------------- Bearer Token ----------------
    "Bearer Token": r"Bearer\s+[A-Za-z0-9\-._~+/]+=*",


    # ---------------- Private Keys ----------------
    "Private Key": r"-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----[\s\S]+?-----END .* KEY-----",

    # ---------------- MongoDB URI ----------------
    "MongoDB URI": r"mongodb(\+srv)?:\/\/[^\s]+",

    # ---------------- PostgreSQL URI ----------------
    "PostgreSQL URI": r"postgres(ql)?:\/\/[^\s]+",

    # ---------------- MySQL URI ----------------
    "MySQL URI": r"mysql:\/\/[^\s]+",

    # ---------------- Generic Secret ----------------
   
}