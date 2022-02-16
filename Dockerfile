# Stage 1
FROM node:12-alpine as build-step
ARG build_type=production
RUN echo ${build_type}
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run ng build -- --prod --configuration=${build_type}


# Stage 2
FROM nginx:1.19.4-alpine
COPY --from=build-step /app/dist/jumia-task-ui /usr/share/nginx/html
# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
