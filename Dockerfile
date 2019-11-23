FROM node:11-alpine

ENV DATABASE_URL=postgres://admin:12345@db:5432/monday
ENV NODE_ENV=production

RUN mkdir -p /src
WORKDIR /src
COPY package.json /src
RUN npm install

COPY . /src

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD npm