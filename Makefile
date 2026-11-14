DOCKER_COMPOSE := docker compose

docker-build-dev: ## Собрать Docker-образ dev (Node + зависимости для Vite)
	$(DOCKER_COMPOSE) build dev

docker-up-dev: ## Запустить dev-контейнер (порты 5173 и 5001, foreground)
	$(DOCKER_COMPOSE) --profile dev up dev

docker-down: ## Остановить контейнеры compose в этом проекте
	$(DOCKER_COMPOSE) down

docker-lint: ## ESLint в контейнере (переиспользует живой контейнер)
	$(DOCKER_COMPOSE) exec dev npm run lint

docker-lint-css: ## Stylelint в контейнере
	$(DOCKER_COMPOSE) exec dev npm run lint:css

docker-format-check: ## Проверка Prettier в контейнере
	$(DOCKER_COMPOSE) exec dev npm run prettier:check

docker-check: docker-lint docker-lint-css docker-format-check ## Полный прогон линтеров перед пушем
