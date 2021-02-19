.PHONY: dev test help
.DEFAULT_GOAL: help

default: help

help: ## Output available commands
	@echo "Available commands:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

dev: ## Run a development environment on [docker-ip]:9001
	@docker-compose build dev
	@docker-compose up dev

loki-test: ## Run test environment with all Loki tests
	@echo "----------"
	@echo "IMPORTANT: Do you have the latest Storybook build? -> npm run storybook-build"
	@echo "----------"
	@docker-compose build loki-test
	@docker-compose run -v /var/run/docker.sock:/var/run/docker.sock --rm loki-test

loki-update: ## Forcefully update all .loki/reference
	@echo "----------"
	@echo "IMPORTANT: Do you have the latest Storybook build? -> npm run storybook-build"
	@echo "----------"
	@docker-compose build loki-update
	@docker-compose run -v /var/run/docker.sock:/var/run/docker.sock --rm loki-update
