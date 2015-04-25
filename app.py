from flask import Flask, render_template
from instagram.client import InstagramAPI
import os

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

@app.route('/', methods=['GET'])
def index():
	results = []

	api = InstagramAPI(client_id=app.config['CLIENT_ID'], client_secret=app.config['CLIENT_SECRET'])
	nu_media = api.media_search(count=20, lat=42.0540611, lng=-87.6713187, distance=1500)

	popular_media = api.media_popular(count=20)

	for media in nu_media:
		results.append(media.images['standard_resolution'].url)

	return render_template('index.html', results=results)

if __name__ == '__main__':
	app.debug = True
	app.run()