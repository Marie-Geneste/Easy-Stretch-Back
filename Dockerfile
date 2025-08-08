#docker build --file Node.Dockerfile "." -t firstimage
# docker run -d --name nodecontainer firstimage
FROM node:24

WORKDIR /O-Stretch--Back

COPY ./app app
COPY package.json .
COPY .env .
COPY index.js .

RUN npm install 

ENV PORT=3000

EXPOSE ${PORT}

CMD ["node", "index.js"]