FROM node:16.10-buster
ENV LANG C.UTF-8
ENV TZ 'Asia/Tokyo'
ENV DEBCONF_NOWARNINGS=yes

# Create app directory
WORKDIR /app

# RUN apt-get update && apt-get install -y postgresql-client
RUN npm install -g npm@7.18.1

# root
COPY .npmrc ./
COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./

# domain以下
COPY ./poker/domain ./poker/domain
# usecase以下
COPY ./poker/usecase ./poker/usecase
# poker-api以下
COPY ./poker/presentations/poker-api/ ./poker/presentations/poker-api/

WORKDIR /app/poker/presentations/poker-api/

RUN npm install
