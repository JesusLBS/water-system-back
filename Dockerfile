FROM node:20.15-alpine3.19

# Create working directory
RUN mkdir -p /home/app
WORKDIR /home/app

# Copy configuration files
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Copy and set permissions for the script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Run the application
CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh db-mysql:3306 -- node --watch --env-file .env.docker app.js"]