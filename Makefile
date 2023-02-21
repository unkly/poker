build-poker-api:
	echo "pokerAPIのビルドを行います"
	docker-compose build poker-api
run-poker-api:
	echo "pokerAPIを起動します。"
	docker-compose up poker-api