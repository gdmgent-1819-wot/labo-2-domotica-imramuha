from sense_hat import SenseHat
from time import time, sleep
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore
import os
import sys
import random
import json
from math import floor, ceil



# constants
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
darkblue = (0, 0, 128)
yellow = (255, 255, 65)
darkyellow = (128, 128, 0)
white = (255, 255, 255)


# SenseHat
try:
    sense_hat = SenseHat()
    sense_hat.set_imu_config(False, False, False)

except:
    print('Unable to initialize the Sense Hat library: {}'.format(sys.exc_info()[0]))
    sys.exit(1)



# firebase implementation
try:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred, {
        'databaseURL' : 'https://labo2-imramuha-3aa68.firebaseio.com/'
    })

    root = db.reference('domotica') 

    
except:
    print('Error with DB! Stopping the application...')
    sys.exit(1)





def main():
    while True:
        humidity = round(sense_hat.get_humidity())
        temp = round(sense_hat.get_temperature())
        root.child('room').set({
            'temperature': temp,
            'humidity': humidity
        })
        print(humidity)

        sleep(3)
        print(temp)




if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print('Interrupt received! Stopping the application...')
    finally:
        print('Cleaning up the mess...')
        sys.exit(0)
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        