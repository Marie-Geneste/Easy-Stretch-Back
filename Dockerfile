#docker build --file Node.Dockerfile "." -t firstimage
# docker run -d --name nodecontainer firstimage

# ---- DEV STAGE ----
FROM node:24 AS dev

WORKDIR /Easy-Stretch-Back

COPY ./app app
COPY package.json .
COPY index.js .

RUN npm install 

ENV NODE_ENV=development
ENV PORT=3000
EXPOSE 3000

CMD ["npx", "nodemon", "index.js"]



# ---- PROD STAGE ----
FROM node:24 AS prod

WORKDIR /Easy-Stretch-Back

COPY ./app app
COPY package.json .
COPY index.js .

RUN npm install --omit=dev

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "index.js"]