# Strongly correlated with Dockerfile
docker build . --tag dmbot:1.0
docker run --name -v ~/Documents/DMBot/logs:/usr/src/dmbot/logs dmbot dmbot:1.0