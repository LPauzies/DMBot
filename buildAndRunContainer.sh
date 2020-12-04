# Strongly correlated with Dockerfile
docker container rm dmbot > /dev/null 2>&1
docker build . --tag dmbot:1.0 > /dev/null 2>&1
docker run -v ~/Documents/DMBot/logs:/usr/src/dmbot/logs --name dmbot dmbot:1.0
