from flask import Flask, render_template, request, send_file
from boto.s3.connection import S3Connection
from boto.s3.key import Key
import os

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

conn = S3Connection(app.config['AWS_ACCESS_KEY_ID'], app.config['AWS_SECRET_ACCESS_KEY'])

k = Key(conn.get_bucket('nucomposite'))
k.key = 'file'
k.set_contents_from_filename('Larry.jpg')