FROM node:10

# set working directory
WORKDIR /ui

# add `/app/node_modules/.bin` to $PATH
ENV PATH /ui/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install --silent

# start app
CMD ["npm", "start"]