FROM node:latest
MAINTAINER linshenghao<1148780544@qq.com>

#ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app
# Expose the app port
EXPOSE 3333

#If the environment in China build please open the following comments
#如果在中国环境下构建请把下面注释打开
#RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install
# 这里遇到一个无法单独下载的问题
#RUN npm install nuxt-sass-resources-loader -D

RUN npm run build
CMD ["npm", "start"]
