# Makefile

# Define variables
DOCKER_COMPOSE = docker-compose

# Default target (run the app)
all: up

# Bring up the containers
up:
	$(DOCKER_COMPOSE) up -d

# Stop and remove the containers
down:
	$(DOCKER_COMPOSE) down

# Rebuild the containers
build:
	$(DOCKER_COMPOSE) build

# Execute commands inside the Node.js container
exec:
	$(DOCKER_COMPOSE) exec node-app sh

# Other targets and rules can be added as needed
