import requests
import json
from pymongo import MongoClient
from flask import jsonify, request, Flask
from flask_cors import CORS
import flask
from utils.utils import *
from bson import ObjectId

app = Flask(__name__)
CORS(app)


@app.route("/login", methods=['POST'])
def loginTest():
    details = request.get_json()["userDetails"]
    userName, uName, mailID = userNameCheck(details["userName"])
    passwordN = passwordCheck(details["password"])
    role = fetchrole(mailID[0])
    if userName == "Success":
        if passwordN == "Success":
            return jsonify({"message": "Congratualtion for Login",
                            "uName": uName[-1],
                            "mailID": mailID,
                            "role": role})
        else:
            return jsonify({"message": "UserName or Password is Incorrect",
                            "uName": "Not Defined",
                            "mailID": "Not Defined",
                            "role": "Not Defined"})
    else:
        return jsonify({"message": "UserName or Password is Incorrect",
                        "uName": "Not Defined",
                        "mailID": "Not Defined",
                        "role": "Not Defined"})


@app.route("/createuser", methods=['POST'])
def insert_document():
    req_data = request.get_json()["UserDetails"]
    config.userDetailsTemplate["primaryEmail"] = req_data["email"]
    config.userDetailsTemplate["name"]["givenName"] = req_data["firstName"]
    config.userDetailsTemplate["name"]["familyName"] = req_data["lastName"]
    config.userDetailsTemplate["password"] = sha(req_data["password"])
    config.userDetailsTemplate["addresses"][0]["streetAddress"] = req_data["address"]
    config.userDetailsTemplate["phones"][0]["value"] = req_data["phone"]
    config.userDetailsTemplate["organizations"][0]["title"] = req_data["title"]

    url = "https://admin.googleapis.com/admin/directory/v1/users"

    payload = json.dumps(config.userDetailsTemplate)
    headers = {
        'Authorization': 'Bearer ya29.a0ARrdaM8CMoECf7xS4_yceRZ41F9iWpcN5FzhRFpT2lu_Vi-BnL4bRUX4DbJuczaLoSe21WzHD3VFd2mCX5q8j__hzbL9KU2zMi_-AJGKXQoGrruyQumj2I_BmczBUvmguaauffIdDLs7Mg-pmFIA5_eH6u3a',
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    config.collection.insert_one(config.userDetailsTemplate).inserted_id
    return jsonify({"message": "Congratualtions user inserted Sucessfully..."})


@app.route("/creattask", methods=['POST'])
def task():
    req_data = request.get_json()
    config.collection1.insert_one(req_data).inserted_id
    message = createCalendarEvent(req_data)
    return jsonify({"message": "Task created Sucessfully..."})


@app.route("/taskassign", methods=['POST'])
def task_assign():
    assignee = request.get_json()
    assign, data, id = task_assigned(assignee["assigned"])
    if assign == "Success":
        return jsonify({"message": "tasks are assigned", "data": data, "populator": id})
    else:
        return jsonify({"message": "tasks are not assigned"})


@app.route("/taskapprove", methods=['POST'])
def taskapproved():
    approver = request.get_json()
    approve, data1 = task_approver(approver["assigned"])
    if approve == "Success":
        return jsonify({"message": "tasks are assigned", "data": data1})
    else:
        return jsonify({"message": "tasks are not assigned"})


@app.route("/staffDetails", methods=['POST'])
def getStaffDetails():
    staffType = request.get_json()["staffType"]
    staffList = getStaffType(staffType)
    return jsonify({"staffList": staffList})


@app.route("/department", methods=['POST'])
def getDepartment():
    department = request.get_json()["department"]
    responsibilities = getResponsibilities(department)
    return jsonify({"responsibilities": responsibilities})

@app.route("/taskstatus", methods=['POST'])
def updateTasks():
    taskID = request.get_json("taskID")
    status, data = getstatus(ObjectId(taskID["taskID"]))
    return jsonify({"status":status, "data":data})

@app.route("/getjson", methods=['POST'])
def gets():
    objid = request.get_json("objid")
    reqJson = getJson(ObjectId(objid["objid"]))
    return jsonify({"message":"json retrived","json":eval(str(reqJson))})

@app.route("/edit", methods=["POST"])
def ej():
    response = request.get_json()
    key = response["key"]
    oid = response["objid"]
    msg = response["message"]
    print(oid)
    editj = editjson(oid, msg, key)
    return(jsonify({"message":repr(editj)}))

@app.route("/delete_collec", methods=['POST'])
def delete_collection():
    req_data = request.get_json()
    temp = deletecollection(req_data)
    return jsonify({"message":"Collection Deleted"})

app.run(debug=True, port=3000, host="0.0.0.0")