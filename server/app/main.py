import uvicorn
from fastapi import FastAPI
from app.routers import generate

app = FastAPI(
    title="Cold Email Generator API",
    version="1.1.0",
    description="Generate personalized cold emails using FastAPI + LangChain with customizable templates"
)

app.include_router(generate.router, prefix="/api", tags=["generate"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7000)