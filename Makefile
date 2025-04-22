.RECIPEPREFIX = -
.PHONY = open

port=3000
container_name=wolke
url=http://localhost:${port}/hello

docker-start: open
	- docker container rm ${container_name} || true
	- docker container run --name ${container_name} --volume .:/home/node/ -p ${port}:${port} wolke:latest npm start
docker-stop: 
	- docker container stop ${container_name}

docker-build:
	- docker image build --tag wolke:latest .

open:
	- open ${url}

open80:
	- open http://localhost/hello

start: open
	- node index.js

open-doc:
	- open http://localhost/doc

bash_nginx:
	- docker container exec -ti reverse_proxy /bin/bash
bash_app:
	- docker container exec -ti reverse_proxy /bin/bash


compose-start: open80
	- docker compose up
compose-stop:
	- docker compose down
