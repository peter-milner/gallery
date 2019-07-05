# pylint: disable=C0103,C0111

import os
from flask import Flask, render_template
from flask_graphql import GraphQLView

from schema import schema

CONSUMER_KEY = os.environ.get('CONSUMER_KEY')

app = Flask(__name__)
app.config['CONSUMER_KEY'] = CONSUMER_KEY

@app.route('/')
def index():
    return render_template('index.html')

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True
    )
)
