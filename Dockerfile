
# For frontend

FROM node:18-alpine as frontend-builder

WORKDIR /app/client

COPY client/mailcold/package*.json ./

RUN npm install

COPY client/mailcold ./

RUN npm build

# For backend

FROM python:3.10-slim as final

WORKDIR /app/server

COPY server/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY server/ ./

COPY --from=frontend-builder /app/client/build /app/server/client_build

EXPOSE 8000

CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]

















