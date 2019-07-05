# pylint: disable=C0103,C0111

import os
import requests
from flask import Flask, render_template

CONSUMER_KEY = os.environ.get('CONSUMER_KEY')

app = Flask(__name__)

@app.route('/')
def index():
    params = {
        'feature': 'popular',
        'consumer_key': CONSUMER_KEY
    }
    r = requests.get('https://api.500px.com/v1/photos', params=params)
    return render_template('index.html', props=r.json())
