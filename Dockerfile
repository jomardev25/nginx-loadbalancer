# Specify a base image
FROM node:alpine

# Install some dependencies
WORKDIR /usr/app

# Add nodemon globally
RUN npm install --global nodemon

RUN mkdir uploads
COPY package.json .
RUN npm install
COPY . .

# Don't use root user
USER node

# Expose port
# EXPOSE 8080

# Set up a default command
CMD [ "npm", "run" "start" ]