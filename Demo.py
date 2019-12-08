from __future__ import absolute_import, division, print_function, unicode_literals
from flask_cors import CORS, cross_origin
from flask import Flask, redirect, url_for, request, jsonify, render_template
from werkzeug.utils import secure_filename
from flask_restful import Resource, Api
from PIL import Image
import pickle,numpy as np
from livereload import Server
import smtplib


import tensorflow as tf

from tensorflow import keras
import requests
from matplotlib import pyplot as plt
import json

app = Flask(__name__)
api = Api(app)
CORS(app)
class farm_md(Resource):
    def post(self):
        f = request.files['image']
        lat = request.form['lat']
        lang = request.form['long']
        print("lm",lang)
        url = "https://samples.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lang+"&appid=929afb7b0813827f36304a13fc9bc44a"
        url_2 = "https://google-maps-geocoding.p.rapidapi.com/geocode/json"
        querystring = {"language": "en", "latlng": str(lat)+","+str(lang)}
        headers = {
            'x-rapidapi-host': "google-maps-geocoding.p.rapidapi.com",
            'x-rapidapi-key': "80ccadac81msh2093ebdef8602e2p12593fjsn3e38e07f5aa0"
        }
        respons = requests.request("GET", url_2, headers=headers, params=querystring)
        x = respons.json()
        response = requests.get(url)
        response = response.json()
        f.save(secure_filename('test.jpg'))
        im = Image.open('test.jpg')
        im = im.resize((224, 224))
        image = np.array(im)
        image = image*(1.0/255)
        image = image.reshape(1, 224, 224, 3)
        model = pickle.load(open('modelv6.pkl', 'rb'))

        prediction = model.predict(image)
        print('Got results...')
        head = ['Apple rust','Apple healthy','Corn rust','Corn healthy']
        correct = max(prediction[0])
        cor_class = ""
        temp = ""
        for i in range(4):
            if prediction[0][i] == correct:
                cor_class = head[i]
                break
        if 'rust' in cor_class:
            text = "Crop infection in your vicinity. Location "+x['results'][0]['address_components'][4]['short_name']+" "+x['results'][0]['address_components'][5]['short_name']
            mail = smtplib.SMTP('smtp.gmail.com', 587)
            mail.ehlo()
            mail.starttls()
            mail.login('hacktest2302@gmail.com','123testhack')
            mail.sendmail('hacktest2302@gmail.com', 'pranavh4@gmail.com',text)
            mail.close()
        json = { "class" : cor_class, "temp": response['main']['temp'],"humidity":response['main']['humidity'], "pressure":response['main']['pressure'], "address": x['results'][0]['address_components'][4]['short_name']+" "+x['results'][0]['address_components'][5]['short_name']}

        return jsonify(json)

api.add_resource(farm_md,'/')
@app.route('/update')
def render():
    '''
    X = [1,2,3,4,5]
    y = [100,98,90,99,97]
    plt.plot(X,y)
    plt.ylabel('humidity')
    plt.xlabel('day')
    plt.title('Humidity of last 5 days')
    plt.savefig('static/images/new_plot1.png')
    X = [1,2,3,4,5]
    y = [140,120,90,200,120]
    plt.plot(X,y)
    plt.ylabel('pressure')
    plt.xlabel('day')
    plt.title('Pressure of last 5 days')
    plt.savefig('static/images/new_plot2.png')
    X = [1,2,3,4,5]
    y = [100,98,90,99,97]
    plt.plot(X,y)
    plt.ylabel('temperature')
    plt.xlabel('day')
    plt.title('Temperature of last 5 days')
    plt.savefig('static/images/new_plot3.png')
    #return render_template('plot.html',name='new_plot',url='static/images/new_plot.png')'''
    return render_template('html_maps.html',url_1='static/images/new_plot1.png',url_2='static/images/new_plot2.png',url_3='static/images/new_plot3.png')
@app.route('/dealer')
def render1():
    return render_template('dealer.html')
if __name__ == '__main__':
    #app.run(host='127.0.0.1',port=5000 , debug = True, use_reloader=True, use_debugger=True, use_evalex=True)
    server = Server(app.wsgi_app)
    server.serve(port=5000)