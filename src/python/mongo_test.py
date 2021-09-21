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
roleID = []
def userNameCheck(userName):
    for doc in collection.find():
        if userName == doc["UserDetails"]["userName"]:
            roleID.append(doc["UserDetails"]["Name"])
            return("Success")

def passwordCheck(password):
    for doc in collection.find():
        if password == doc["UserDetails"]["password"]:
            return("Success")

@app.route("/login", methods=['POST'])
def loginTest():
    details = request.get_json()["userDetails"]
    print(details)
    userName = userNameCheck(details["userName"])
    passwordN = passwordCheck(details["password"])
    if userName == "Success":
        if passwordN == "Success":
            return jsonify({"message":"Congratualtion for Login",
            "roles":roleID.pop()})
        else:
            return jsonify({"message":"UserName or Password is Incorrect",
            "roles":"Not Defined"})
    else:
        return jsonify({"message":"UserName or Password is Incorrect",
            "roles":"Not Defined"})

@app.route("/createuser", methods=['POST'])
def insert_document():
    req_data = request.get_json()
    collection.insert_one(req_data).inserted_id
    return jsonify({"message":"User Created Successfully"})

@app.route("/creattask", methods=['POST'])
def insert_document2():
    req_data = request.get_json()
    collection1.insert_one(req_data).inserted_id
    return jsonify({"message":"Task Assigned Successfully"})

app.run(debug=True)
