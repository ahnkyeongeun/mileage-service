## Development Environment

- MySQL 8.0
- Node v14.19.2
- Docker


## Start Guide

준비된 init 파일을 실행합니다.
```bash
$ ./init
```
명령어를 입력하면 프로젝트가 세팅되고 시작됩니다.
(docker-compose가 실행되고 db 컨테이너에 테이블이 생성됩니다.)

만약 init파일이 제대로 작동하지 않는다면 아래와 같이 순차적으로 실행합니다.

```bash
$ docker-compose up -d

$ docker exec -it mileage-service npm run ts-typeorm migration:run
```


## DDL

테이블과 인덱스에 관한 DDL은 아래 파일에서 확인할 수 있습니다. 
 ```bash
$ src/migrations/1657340247599-CreateTripleTabe
```


## Swagger

http://localhost:3000/api/docs/













