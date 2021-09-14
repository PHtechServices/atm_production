from pymongo import MongoClient
from flask import jsonify, request, Flask
from flask_cors import CORS
import flask

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://himanshu:himanshu@cluster0.ebjdo.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-13hnoa-shard-0&w=majority&readPreference=primary&retryWrites=true", 
                    tlsAllowInvalidCertificates=True, tls=True)
db = client.AtmPohu
collection = db.Users
collection1 = db.Task
def userNameCheck(userName):
    for doc in collection.find():
        if userName == doc["Users"]["Username"]:
            return("Success")

def passwordCheck(password):
    for doc in collection.find():
        if password == doc["Users"]["Password"]:
            return("Success")

@app.route("/login", methods=['POST'])
def loginTest():
    details = request.get_json()["userDetails"]
    print(details)
    userName = userNameCheck(details["userName"])
    passwordN = passwordCheck(details["password"])
    if userName == "Success":
        if passwordN == "Success":
            return jsonify({"message":"Congratualtion for Login"})
        else:
            return jsonify({"message":"UserName or Password is Incorrect"})

@app.route("/createuser", methods=['POST'])
def insert_document():
    req_data = request.get_json()
    collection.insert_one(req_data).inserted_id
    return jsonify({"message":"Congratualtions user inserted Sucessfully..."})

@app.route("/creattask", methods=['POST'])
def insert_document2():
    req_data = request.get_json()
    collection1.insert_one(req_data).inserted_id
    return jsonify({"message":"Congratualtions user inserted Sucessfully..."})

app.run(debug=True)
