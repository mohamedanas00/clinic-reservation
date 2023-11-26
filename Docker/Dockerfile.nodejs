FROM node:18.17.1
WORKDIR /app
COPY ["package-lock.json","package.json*","./"]
RUN npm install 
COPY . .
CMD ["node","index.js"]