from app import db

class Photos(db.Model):
	__tablename__ = 'photos'

	id = db.Column(db.Integer, primary_key=True)
	url = db.Column(db.String())
	timestamp = db.Column(db.DateTime())
	lat = db.Column(db.Float())
	lng = db.Column(db.Float())

	def __init__(self, id, url, timestamp, lat, lng):
		self.id = id
		self.url = url
		self.timestamp = timestamp
		self.lat = lat
		self.lng = lng

	def __repr__(self):
		return '<id {}>'.format(self.id)