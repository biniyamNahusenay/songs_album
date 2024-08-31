# Use an official Node.js runtime as a parent image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ../package*.json ./

# Install any needed packages specified in package.json, mostly we use RUN command to execute
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make the port 5000 available to the outside world
EXPOSE 5000

# Command to run the app, if it is the last command in the dockerfile we use CMD instead of RUN , it starts the application
CMD ["npm", "run", "backend"]