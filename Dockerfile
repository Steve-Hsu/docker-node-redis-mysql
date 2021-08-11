FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 5000

COPY . .


# COPY wait-for-it.sh /

# RUN npm run build

# CMD /wait-for-it.sh db:3306 -- npm start
CMD ["npm", "start"]