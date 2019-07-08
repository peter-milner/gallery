import os
from flask import Flask, render_template
from flask_graphql import GraphQLView

from cache import cache
from schema import schema

app = Flask(__name__)

app.config['CONSUMER_KEY'] = os.environ.get('CONSUMER_KEY')
app.config['CACHE_TYPE'] = os.environ.get('CACHE_TYPE', 'redis')
app.config['CACHE_REDIS_HOST'] = os.environ.get('REDIS_HOST')

cache.init_app(app)

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
