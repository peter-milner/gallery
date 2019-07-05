# pylint: disable=C0103,C0111

import os
from flask import Flask, render_template

app = Flask(__name__)

CONSUMER_KEY = os.environ.get('CONSUMER_KEY')

@app.route('/')
def index():
    return render_template('index.html')
