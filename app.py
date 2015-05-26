from flask import Flask, render_template, request, send_file
from instagram.client import InstagramAPI
import os
import json
from boto.s3.connection import S3Connection
from boto.s3.key import Key
from parse_rest.connection import register
from parse_rest.datatypes import Date, GeoPoint
from parse_rest.datatypes import Object as ParseObject
import requests
import shutil


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])


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

	# ig connection
	api = InstagramAPI(client_id=app.config['CLIENT_ID'], client_secret=app.config['CLIENT_SECRET'])

	# parse connection
	register(app.config['APPLICATION_ID'], app.config['REST_API_KEY'])

	# s3 connection
	conn = S3Connection(app.config['AWS_ACCESS_KEY_ID'], app.config['AWS_SECRET_ACCESS_KEY'])

	data = json.loads(request.data.decode())
	lat = data["lat"]
	lng = data["lng"]
	
	photos = api.media_search(count=10, lat=lat, lng=lng, distance=1500)

	class Face(ParseObject):
		pass

	for i in range(len(photos)):
		# urllib.urlretrieve(photos[i].images['standard_resolution'].url, "temp.jpg")
		response = requests.get(photos[i].images['standard_resolution'].url, stream=True)
		with open('temp.jpg', 'wb') as out_file:
    			shutil.copyfileobj(response.raw, out_file)
		del response
		
		k = Key(conn.get_bucket('nucomposite'))
		k.key = str(photos[i].id)
		k.set_contents_from_filename('temp.jpg')
		
		os.remove('temp.jpg')

		aws_url = 'http://nucomposite.s3.amazonaws.com/' + str(photos[i].id)

		to_save = Face(
			url=aws_url,
			timestamp = photos[i].created_time,
			location = GeoPoint(latitude = photos[i].location.point.latitude, longitude = photos[i].location.point.longitude),
			id = str(photos[i].id)
			)
		to_save.save()


	my_loc = GeoPoint(latitude=lat, longitude=lng)

	myquery = Face.Query.filter(location__nearSphere=my_loc)

	for i in myquery:
		results.append(i.url)
	
	results = json.dumps(results)

	return results







if __name__ == '__main__':
	app.debug = True
	app.run()