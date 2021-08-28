FROM node:current-slim AS buildclient
RUN mkdir /gen
COPY . /gen/

ENV project "philoxenia-client"
WORKDIR /gen

RUN npm install -g @quasar/cli
RUN npm install
RUN quasar build -m pwa


FROM nginx:latest 

COPY --from=buildclient /gen/dist/pwa/ /pwa
RUN chown -R nginx:nginx /pwa

ADD https://gist.githubusercontent.com/pcnoic/648584a7273dd906f058d4eed34dc915/raw/e7617608fe190d6a841662b0c966bc05d7639fc5/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
