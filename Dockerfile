######################################
# CSESoc Degree Planner Docker Image #
######################################

FROM node:8-jessie
WORKDIR /app
COPY . /app
RUN yarn install
EXPOSE 3000
CMD ["/app/prod.sh"]
