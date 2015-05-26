from flask import Flask, render_template, request, send_file
from instagram.client import InstagramAPI
# from flask.ext.sqlalchemy import SQLAlchemy
import os
import json
from boto.s3.connection import S3Connection
from boto.s3.key import Key


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
# db = SQLAlchemy(app)


###############
# Index route #
###############
@app.route("/")
def index():
    return send_file("templates/index.html")



###########################
# Instagram request route #
###########################
@app.route('/instagram', methods=['POST'])
def instagram():
	results = []
	api = InstagramAPI(client_id=app.config['CLIENT_ID'], client_secret=app.config['CLIENT_SECRET'])

	data = json.loads(request.data.decode())
	lat = data["lat"]
	lng = data["lng"]
	your_location = api.media_search(count=100, lat=lat, lng=lng, distance=1500)

	# pull photos directly from the IG servers
	# for media in your_location:
	# 	results.append(media.images['standard_resolution'].url)

	# face detection route w/out face detection
	conn = S3Connection(app.config['AWS_ACCESS_KEY_ID'], app.config['AWS_SECRET_ACCESS_KEY'])
	k = Key(conn.get_bucket('nucomposite'))

	results = json.dumps(results)

	return results







if __name__ == '__main__':
	app.debug = True
	app.run()