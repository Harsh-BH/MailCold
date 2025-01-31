import uvicorn
from fastapi import FastAPI
from app.routers import generate

app  =FastAPI(
    title="cold email Genearor api",
    version="1.0.0",
    description= " Generate personalized cold emails using FastAPI + LangChain"
)

app.include_router(generate.router, prefix="",tags=["generate"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7000)