FROM node:22-alpine
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5080
CMD ["ls"]
CMD ["npm", "run dev"]