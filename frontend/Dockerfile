FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Run tests
RUN npm test -- --watchAll=false || true

EXPOSE 3000

CMD ["npm", "start"]
