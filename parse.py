from flask import Flask, render_template, request, send_file
import os
from datetime import datetime
from parse_rest.connection import register
from parse_rest.datatypes import Date, GeoPoint
from parse_rest.datatypes import Object as ParseObject 

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

register(app.config['APPLICATION_ID'], app.config['REST_API_KEY'])

class Face(ParseObject):
	pass


now = datetime.now()

larry = Face(url="http://www.google.com", timestamp=now, location = GeoPoint(latitude=42.0464, longitude=87.6947))

# larry = ParseObject()
# larry.url = "http://nucomposite.s3.amazonaws.com/file"
# larry.timestamp = now
# larry.location = GeoPoint(latitude=42.0464, longitude=87.6947)
# larry.instagramID = 1

# larry.save()
my_loc = GeoPoint(latitude=42.0464, longitude=87.6947)
testQuery= Face.Query.filter(location__nearSphere=my_loc)

for i in testQuery:
	print(i.url)