FROM node:20

RUN apt-get update && apt-get install -y \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libgbm1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libasound2 \
    libxshmfence1 \
    libx11-xcb1 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV ELECTRON_RUN_AS_NODE=1

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel", "--host", "0.0.0.0"]