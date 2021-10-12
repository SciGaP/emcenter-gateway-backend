# EMCenter Gateway Backend

## Local build

```
npm install
npm run start
```

## Docker build

```
docker build -t apachecustos/emcenter-gateway-backend . 
docker push apachecustos/emcenter-gateway-backend

sudo docker-compose down
sudo docker-compose up -d
```
