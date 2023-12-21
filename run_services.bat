REM Define the network name
SET DOCKER_NETWORK=mynetwork

REM Function to check if a Docker network exists
:network_exists
SET NETWORK_EXISTS=0
FOR /F "tokens=*" %%i IN ('docker network ls --format ^{{.Name^}} ^| find /I "%DOCKER_NETWORK%"') DO SET NETWORK_EXISTS=1

REM Function to create a Docker network if it doesn't exist
:create_network
IF %NETWORK_EXISTS% EQU 0 (
    docker network create %DOCKER_NETWORK%
)

REM Function to build and run RabbitMQ container
:run_rabbitmq
docker build -t rabbitmq -f Docker\Dockerfile.rabbitmq .
docker run -d --name rabbitmq --network %DOCKER_NETWORK% -p 5672:5672 -p 15672:15672 rabbitmq

REM Function to build and run Node.js app container
:run_node_app
docker build -t node-app -f Docker\Dockerfile.nodejs .
docker run -d --name backend-container01 -p 5000:8000 -e PORT=8000 -e DB_HOST="bdxcsi5sokfugsljmjys-mysql.services.clever-cloud.com" -e DB_USERNAME=uv7v4blbnkhx7d5q -e DB_PASSWORD="BrwaY3K65sLvEUgYoQ2a" -e DB_DBNAME=bdxcsi5sokfugsljmjys -e salt_round=8 -e TOKEN_SIGNATURE="Loserlolaaa" -e BEARER_KEY="key_" -e page_limit=20 -e gmail="m.ametwally15@gmail.com" -e EMAIL_PASSWORD="jqubhqjeatmprplt"--network %DOCKER_NETWORK% node-app

REM Function to run the MySQL container
:run_mysql
docker run -d --name mysql-container -p 3306:3306 --network %DOCKER_NETWORK% -e DB_HOST="bdxcsi5sokfugsljmjys-mysql.services.clever-cloud.com" -e DB_USERNAME=uv7v4blbnkhx7d5q -e DB_PASSWORD="BrwaY3K65sLvEUgYoQ2a" -e DB_DBNAME=bdxcsi5sokfugsljmjys -e salt_round=8 -e TOKEN_SIGNATURE="Loserlolaaa" -e BEARER_KEY="key_" -e page_limit=20 -e gmail="m.ametwally15@gmail.com" -e EMAIL_PASSWORD="jqubhqjeatmprplt" mysql:8.0

REM Function to run the frontend container
:run_frontend
docker run -d --name frontend-container01 --network %DOCKER_NETWORK% -p 4200:80 frontend

REM Check if Docker is installed
where docker >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO Docker is not installed. Please install Docker before running this script.
    EXIT /B 1
)

REM Check if the network exists or create it
CALL :create_network

REM Run services
CALL :run_rabbitmq
CALL :run_node_app
CALL :run_mysql
CALL :run_frontend

REM Provide information to the user
ECHO Services are starting. You can access:
ECHO - RabbitMQ at http://localhost:15672
ECHO - Node.js app at http://localhost:5000
ECHO - MySQL at localhost:3306
ECHO - Frontend app at http://localhost:4200
