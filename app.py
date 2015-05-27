from flask import Flask, render_template, request, send_file
from instagram.client import InstagramAPI
from flask.ext.sqlalchemy import SQLAlchemy
import os
import json
from face_detection import detect_faces

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)


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
	dist = data["dist"]
	min_tstmp = data["min_timestamp"]
	your_location = api.media_search(count=100, lat=lat, lng=lng, distance=dist, min_timestamp=min_tstmp)

	for media in your_location:
		url = media.images['standard_resolution'].url
		pid = media.id
		img_paths = detect_faces(url, pid)
		if not img_paths == []:
			for img_path in img_paths:
				results.append(img_path)

	results = json.dumps(results)
	print "****** RESULTS ******"
	print " "
	print results

	return results







if __name__ == '__main__':
	app.debug = True
	app.run()