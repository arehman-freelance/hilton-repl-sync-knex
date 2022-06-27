FROM node:18.2-bullseye
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    gconf-service \
    # libappindicator1 \ 
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \ 
    libgbm-dev \
    libgdk-pixbuf2.0-0 \ 
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \ 
    libpangocairo-1.0-0 \ 
    libpng-dev \
    libx11-6 \
    libx11-xcb1 \ 
    libxcb1 \
    libxcomposite1 \ 
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \ 
    libxi6 \
    libxrandr2 \ 
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    libaio1

RUN mkdir -p /opt/oracle
WORKDIR /opt/oracle/
RUN wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basic-linuxx64.zip
RUN unzip instantclient-basic-linuxx64.zip
RUN sh -c "echo /opt/oracle/instantclient_21_6 > /etc/ld.so.conf.d/oracle-instantclient.conf" && ldconfig

WORKDIR /usr/app
# COPY package.json .
# RUN npm install --quiet
COPY . .