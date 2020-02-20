FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# RUN npm install
RUN npm install

# Copy app files to source
COPY . .

# Expose port 
EXPOSE 3000
CMD [ "npm", "start" ]