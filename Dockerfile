 FROM node:18-alpine as frontend-builder

    WORKDIR /app/client
    COPY client/package*.json ./
    RUN npm install

    COPY client/ ./

    RUN npm run build

    FROM python:3.10-slim as final

    WORKDIR /app

    COPY server/requirements.txt /app
    RUN pip install --no-cache-dir -r requirements.txt

    COPY server/ /app/server

    COPY --from=frontend-builder /app/client/build /app/server/client_build

    EXPOSE 8000
    
    CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]
