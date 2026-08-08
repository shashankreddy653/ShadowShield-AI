from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router
from database import init_db

app = FastAPI(
    title="ShadowShield AI API",
    version="1.0.0"
)

# Initialize SQLite Database
init_db()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "ShadowShield AI Backend Running"
    }