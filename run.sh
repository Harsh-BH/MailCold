set -e
IMAGE_NAME="my-fullstack-app"

echo "=== Building Docker image: $IMAGE_NAME ==="
docker build -t $IMAGE_NAME .

echo "=== Running Docker container: $IMAGE_NAME ==="
docker run -p 8000:8000 $IMAGE_NAME
