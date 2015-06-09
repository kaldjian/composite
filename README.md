# Composite
## Northwestern University, EECS 395 (Innovation in Journalism & Technology)
### Alex Kaldjian, Matt Ehringer, Jon Rovira


## Overview
Composite is meant to facilitate a social experiment thought up by Zach Wise at Northwestern University. The web application's
interface allows users to maneuver a map and view the faces cropped out of images posted on Instagram from the respective location.
At each location, users will see simply a grid of faces and are able to infer whatever they may simply by that display.


## Technology
Composite's architecture involves a combination of AngularJS, Flask, Parse, Google Maps API, OpenCV, and Amazon Web Services.
Essentially, whenever a user either moves the map, zooms on a location within the map, enters a location in the header's
location input, or changes the date in the header's datepicker, the client recomputes the location and date constraints and
hits an Instagram endpoint on our back end, pulling the 100 images that best match those constraints. From Instagram, we get
an array of image objects, each containing an Instagram ID along with the URL to each of the images on Instagram's servers.
To extract the necessary faces that we'll eventually be showing in the interface, we first check to see if we've already
processed the images by checking our database of images in Parse. The remainder of images that have not yet been processed
are sent over to an OpenCV script that gets all of the cropped faces in them, shooting over the resulting image files to AWS
to host and also to Parse to keep track of. At this point, we're left with an array of image URLs, all pointing to images on
AWS, which we then shoot back to the client to display.


## File Structure
	.
	├── README.md
	├── app.py                      # Flask routing, instagram endpoint, app configuration
	├── config.py
	├── face_detection.py           # Handles face detection with OpenCV
	├── haarscascades               # Contains face models for cropping functionality
	|   ├── eye
	|   |   ├── haarcascade_eye.xml
	|   |   ├── haarcascade_eye_tree_eyeglasses.xml
	|   |   ├── ...
	|   ├── face
	|   |   ├── haarcascade_frontalface_alt.xml
	|   |   ├── haarcascade_frontalface_default.xml
	|   |   ├── ...
	├── manage.py
	├── models.py
	├── requirements.txt              # Defines application's Flask dependencies
	├── static
	|   ├── bower_components          # Javascript dependencies and libraries
	|   |   ├── ...
	|   ├── css                       # Contains all styling with a SASS layout
	|   |   ├── main.css              # Output from sass watch on main.scss
	|   |   ├── main.css.map
	|   |   ├── main.scss             # All SASS scripts compile into this file
	|   |   ├── modules
	|   |   |   ├── _all.scss         # All modules compile into this file
	|   |   |   ├── ...
	|   |   ├── normalize.css
	|   |   ├── partials
	|   |   |   ├── _base.scss        # All partials compile into this file
	|   |   |   ├── ...
	|   ├── fonts                     # Application fonts
	|   |   ├── ...
	|   ├── img                       # Temporary store for cropped images
	|   |   ├── cropped_faces
	|   |   |   ├── ...
	|   ├── js                        # Angular modules
	|   |   ├── app.js                # Declares angular application
	|   |   ├── controllers           # Controller module
	|   |   |   ├── facesCtrl.js      # Controls main faces view
	|   |   |   ├── headerCtrl.js     # Controls header
	|   |   |   ├── index.js          # Defines module
	|   |   |   ├── mapCtrl.js        # Controls main map view
	|   |   |   ├── metaCtrl.js       # Maintains models throughout application
	|   |   |   ├── peekCtrl.js       # Controls peek view in bottom left of interface
	|   |   ├── services              # Services module
	|   |   |   ├── blockingSrv.js    # Implements a block so Instagram endpoint doesn't get overwhelmed
	|   |   |   ├── facesModelSrv.js  # Updates faces model with given constraints
	|   |   |   ├── index.js          # Defines module
	|   |   |   ├── modelSrv.js       # Manipulates application's models
	|   ├── partials                  # Contains all view partials
	|   |   ├── ...
	├── templates                     # Flask templates
	|   ├── index.html                # Just one because Angular










