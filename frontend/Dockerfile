# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Temporarily change to frontend directory, install dependencies, then switch back
WORKDIR /usr/src/app/frontend
RUN npm install

# Change back to the original directory
WORKDIR /usr/src/app

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
ENTRYPOINT [ "npm", "start" ]