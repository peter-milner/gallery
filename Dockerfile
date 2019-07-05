FROM python:3.7-alpine

RUN apk update \
    && apk add python3-dev gcc build-base yarn \
    && pip install pipenv

COPY .pylintrc /
COPY webpack.config.js /
COPY .babelrc /

COPY Pipfile /
COPY Pipfile.lock /
COPY package.json /
COPY yarn.lock /

RUN pipenv install --dev --system
RUN yarn

COPY src/ /app
WORKDIR /app
