import sys, cv2
import cv2.cv as cv

#Command line argument for image path
imagePath = sys.argv[1]

#global path for haar cascades
haarPath = './haarcascades/'
facePath = 'face/haarcascade_frontalface_alt.xml'
leftEyePath = 'eye/haarcascade_mcs_lefteye.xml'
rightEyePath = 'eye/haarcascade_mcs_lefteye.xml'

#Train the Haar-cascade classifier
face_cascade = cv2.CascadeClassifier(haarPath + facePath)
left_eye_cascade = cv2.CascadeClassifier(haarPath + leftEyePath)
right_eye_cascade = cv2.CascadeClassifier(haarPath + rightEyePath)


def detect(path):

	#Read the image
	color = cv2.imread(path)
	gray = cv2.cvtColor(color, cv2.COLOR_BGR2GRAY)

	#Detect faces in the image
	faces = face_cascade.detectMultiScale(gray, 1.3, 4, cv2.cv.CV_HAAR_SCALE_IMAGE, (20, 20))
	print "Number of faces: ", len(faces)
	if len(faces) == 0:
		print "0 faces"
		return [], gray

	faces[:, 2:] += faces[:, :2]
	return faces, gray, color


def faceBox(faces, gray, color, path):
    # Draw a face in black&white and in color image
    # black and white
    for x1, y1, x2, y2 in faces:
        cv2.rectangle(gray, (x1, y1), (x2, y2), (127, 255, 0), 2)
    # color
    for x1, y1, x2, y2 in faces:
        cv2.rectangle(color, (x1, y1), (x2, y2), (127, 255, 0), 2)

    # save each face in the image
    imageToPrint = path.split('.')[0]
    count = 0
    for x1, y1, x2, y2 in faces:
        width = x2 - x1
        height = y2 - y1
        crop_img = color[y1:y1 + height, x1:x1 + width]
        cv2.imwrite(imageToPrint + "_face_" + str(count) + ".jpg", crop_img)
        count = count + 1

    return count

def eyeBox(path, numberOfFaces):
    # Image Configuration
    imagePath = path.split('.')[0]
    imageToPrint = imagePath + "_face_%s.jpg"

    # Go through each image
    for i in range(0, numberOfFaces):
        # Get i face image
        color = cv2.imread(imageToPrint % str(i))
        gray = cv2.cvtColor(color, cv2.COLOR_BGR2GRAY)
        left_eye = left_eye_cascade.detectMultiScale(color)
        right_eye = right_eye_cascade.detectMultiScale(color)

        # Perform analysis
        for (x, y, w, h) in left_eye:
            cv2.rectangle(color, (x, y), (x + w, y + h), (0, 255, 0), 2)


if __name__ == '__main__':
    if len(sys.argv) is 1:
        print "Please provide a image name"
    else:
        imageName = sys.argv[1]
        faces, img, color = detect(imageName)
        numberOfFaces = faceBox(faces, img, color, imageName)
        print "numberOfFaces: ", numberOfFaces
        eyeBox(imageName, numberOfFaces)

