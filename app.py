from flask import Flask, render_template, request
from instagram.client import InstagramAPI
import os

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])


##############
# Faces view #
##############
@app.route('/faces', methods=['GET', 'POST'])
def faces():
	results = []
	api = InstagramAPI(client_id=app.config['CLIENT_ID'], client_secret=app.config['CLIENT_SECRET'])
	
	# user entered location
	if request.method == "POST":
		lat = request.form['lat']
		lon = request.form['lon']
		your_location = api.media_search(count=100, lat=lat, lng=lon, distance=1500)


		for media in your_location:
		 	results.append(media.images['standard_resolution'].url)

	# defaults to NU location
	else:
		nu_media = api.media_search(count=100, lat=42.0540611, lng=-87.6713187, distance=1500)
		for media in nu_media:
		 	results.append(media.images['standard_resolution'].url)

	return render_template('faces.html', results=results)



############
# Map view #
############
@app.route('/map', methods=['GET'])
def map():
	return render_template('map.html')







if __name__ == '__main__':
	app.debug = True
	app.run()