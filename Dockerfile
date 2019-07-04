FROM python:3.7-alpine

RUN apk update \
    && pip install pipenv

COPY Pipfile /
COPY Pipfile.lock /
RUN pipenv install --system

COPY src/ /app
WORKDIR /app
