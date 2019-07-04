FROM python:3.7-alpine

RUN apk update \
    && apk add python3-dev gcc build-base \
    && pip install pipenv

COPY .pylintrc /
COPY Pipfile /
COPY Pipfile.lock /
RUN pipenv install --dev --system

COPY src/ /app
WORKDIR /app
