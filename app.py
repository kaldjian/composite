from flask import Flask, render_template, request, send_file
from instagram.client import InstagramAPI
import os
import json
from face_detection import detect_faces
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

	# dist = data["dist"]
	# min_tstmp = data["min_timestamp"]
	# your_location = api.media_search(count=100, lat=lat, lng=lng, distance=dist, min_timestamp=min_tstmp)

	# for media in your_location:
	# 	url = media.images['standard_resolution'].url
	# 	pid = media.id
	# 	img_paths = detect_faces(url, pid)
	# 	if not img_paths == []:
	# 		for img_path in img_paths:
	# 			results.append(img_path)

	photos = api.media_search(count=50, lat=lat, lng=lng, distance=1500)

	class Face(ParseObject):
		pass

	k = Key(conn.get_bucket('nucomposite'))

	for i in range(len(photos)):
		# urllib.urlretrieve(photos[i].images['standard_resolution'].url, "temp.jpg")
		img = photos[i]
		url = img.images['standard_resolution'].url
		pid = img.id
		img_paths = detect_faces(url, pid)
		
		if not img_paths == []:
			for img_path in img_paths:
				local_path = img_path[0]
				face_key = img_path[1]
				results.append(local_path)

				k.key = face_key
				k.set_contents_from_filename(local_path)

				aws_url = 'http://nucomposite.s3.amazonaws.com/' + face_key

				to_save = Face(
				url=aws_url,
				timestamp = photos[i].created_time,
				location = GeoPoint(latitude = photos[i].location.point.latitude, longitude = photos[i].location.point.longitude),
				id = str(face_key)
				)
				to_save.save()



		# response = requests.get(photos[i].images['standard_resolution'].url, stream=True)
		# with open('temp.jpg', 'wb') as out_file:
  #   			shutil.copyfileobj(response.raw, out_file)
		# del response
		
		# k = Key(conn.get_bucket('nucomposite'))
		# # k.key = str(photos[i].id)
		# # k.set_contents_from_filename('temp.jpg')
		
		# # os.remove('temp.jpg')

		# aws_url = 'http://nucomposite.s3.amazonaws.com/' + str(photos[i].id)

		# to_save = Face(
		# 	url=aws_url,
		# 	timestamp = photos[i].created_time,
		# 	location = GeoPoint(latitude = photos[i].location.point.latitude, longitude = photos[i].location.point.longitude),
		# 	id = str(photos[i].id)
		# 	)
		# to_save.save()


	# my_loc = GeoPoint(latitude=lat, longitude=lng)

	# myquery = Face.Query.filter(location__nearSphere=my_loc)

	# for i in myquery:
	# 	results.append(i.url)
	
	results = json.dumps(results)
	return results







if __name__ == '__main__':
	app.debug = True
	app.run()