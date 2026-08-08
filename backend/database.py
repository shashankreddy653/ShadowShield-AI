import sqlite3

DATABASE = "shadowshield.db"


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()

    conn.execute("""
    CREATE TABLE IF NOT EXISTS website_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        risk_score INTEGER NOT NULL,
        risk_level TEXT NOT NULL,
        ai_summary TEXT,
        analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS leak_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_text TEXT NOT NULL,
        redacted_text TEXT,
        rewritten_text TEXT,
        secrets_found INTEGER,
        analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()


def save_website_scan(url, score, risk, ai_summary):
    conn = get_connection()

    conn.execute("""
    INSERT INTO website_history
    (url, risk_score, risk_level, ai_summary)
    VALUES (?, ?, ?, ?)
    """, (url, score, risk, ai_summary))

    conn.commit()
    conn.close()


def get_website_history():
    conn = get_connection()

    rows = conn.execute("""
    SELECT *
    FROM website_history
    ORDER BY analyzed_at DESC
    """).fetchall()

    conn.close()

    return [dict(row) for row in rows]
def save_leak_scan(original, redacted, rewritten, secrets_found):
    conn = get_connection()

    conn.execute("""
    INSERT INTO leak_history
    (original_text, redacted_text, rewritten_text, secrets_found)
    VALUES (?, ?, ?, ?)
    """, (original, redacted, rewritten, secrets_found))

    conn.commit()
    conn.close()


def get_leak_history():
    conn = get_connection()

    rows = conn.execute("""
    SELECT *
    FROM leak_history
    ORDER BY analyzed_at DESC
    """).fetchall()

    conn.close()

    return [dict(row) for row in rows]