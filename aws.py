from flask import Flask, render_template, request, send_file
from boto.s3.connection import S3Connection
from boto.s3.key import Key
import os
from instagram.client import InstagramAPI
import urllib
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)


api = InstagramAPI(client_id=app.config['CLIENT_ID'], client_secret=app.config['CLIENT_SECRET'])
photo_object = api.media_search(count=1, lat=42.2814, lng=83.7483, distance=1500)

photo_url = photo_object[0].images['standard_resolution'].url
photo_id = photo_object[0].id
photo_time = photo_object[0].created_time
photo_lat = photo_object[0].location.point.latitude
photo_lng = photo_object[0].location.point.longitude


urllib.urlretrieve(photo_url, "test.jpg")


conn = S3Connection(app.config['AWS_ACCESS_KEY_ID'], app.config['AWS_SECRET_ACCESS_KEY'])

k = Key(conn.get_bucket('nucomposite'))
k.key = str(photo_object[0].id)
k.set_contents_from_filename('test.jpg')
os.remove('test.jpg')
