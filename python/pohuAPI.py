import requests
import json
from pymongo import MongoClient
from flask import jsonify, request, Flask
from flask_cors import CORS
import flask
from utils.utils import *
from bson import ObjectId
import copy
import datetime

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
    config.userDetailsTemplate["organizations"][0]["name"] = req_data["college"]

    # url = "https://admin.googleapis.com/admin/directory/v1/users"

    # payload = json.dumps(config.userDetailsTemplate)
    # headers = {
    #     'Authorization': 'Bearer ya29.a0ARrdaM94h_V5W1h5mAZwDqMZJ1LPdCuETHNpggWwsgQrA-WqW9XChRy9gbM6q0XhXKBmJtQRil0BD-ATRl0ASW8dRCBRTu5rwJEUEmJEdLf7IBR8Ka5ZxgF40lQChe9rnIIVRr0hfVpSpN64tYhdkW2jsEszdg',
    #     'Content-Type': 'application/json'
    # }

    # response = requests.request("POST", url, headers=headers, data=payload)

    config.collection.insert_one(config.userDetailsTemplate).inserted_id
    return jsonify({"message": "Congratualtions user inserted Sucessfully..."})


@app.route("/creattask", methods=['POST'])
def task():
    req_data = request.get_json()
    config.collection1.insert_one(req_data).inserted_id
    message = createCalendarEvent(req_data)
    return jsonify({"message": "Task created Sucessfully..."})

@app.route("/createMeeting", methods=['POST'])
def meeting():
    data= []
    req_data = request.get_json()
    req_data = req_data["data"]
    for i in req_data["attendees"]:
        data.append(getEmail(i))
    data = createMeeting(req_data,data)
    config.collectionMeetings.insert_one(data).inserted_id
    return jsonify({"message": "Meeting created Sucessfully..."})


@app.route("/taskassign", methods=['POST'])
def task_assign():
    assignee = request.get_json()
    assign, data, id = task_assigned(assignee["assigned"])
    if assign == "Success":
        return jsonify({"message": "tasks are assigned", "data": data, "populator": id})
    else:
        return jsonify({"message": "tasks are not assigned", "data": data})


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

#task_Assign using Object id
@app.route("/taskassign1", methods=['POST'])
def task_assign1():
    objid = request.get_json("obji")
    jsoni = getJson(ObjectId(objid["obji"]))
    print(jsoni)
    return jsonify({"message":"json retrived","json":jsoni})

@app.route("/updateComments", methods=['POST'])
def checkmailfortaskupdate():
    x = request.get_json()
    js = x["data"]
    objid = x["objid"]
    print(objid)
    temp = {}
    ct = str(datetime.datetime.now().date())
    js["timeStamp"]=ct
    for a in config.collection1.find():
        if ObjectId(objid) == a["_id"]:
            for key, value in a.items():
                if key not in ["_id"]:
                    temp[key]=value
            old = copy.deepcopy(temp)
            new = copy.deepcopy(temp)
            new["task updates"].append(js)
            edit = config.collection1.replace_one(old,new)
            return ("Success")


@app.route("/classInfo", methods=['GET'])
def class_info():
    classes = getClassInfo()
    subjects = getSubjectInfo()
    return jsonify({"xx":list(classes), "yy":list(subjects)})

@app.route("/sectionInfo", methods=['POST'])
def section_info():
    x = request.get_json()
    cls = x["class"]
    section = getSectionInfo(cls)
    return jsonify({"xx":section})

@app.route("/getTeachersList", methods=['GET'])
def get_teachers_list():
    teachers, nonTeachers, test , test1= getTeachersList()
    return jsonify({"teachers":list(teachers), "nonTeachers":list(nonTeachers), "test":test, "test1": test1})

@app.route("/teacherRS", methods=['POST'])
def teacherResponsibilitySubmission():
    req_data = request.get_json()
    config.collectionTeacherAssignments.insert_one(req_data).inserted_id
    return jsonify({"message": "Task created Sucessfully..."})

@app.route("/getComments", methods=['POST'])
def getComments():
    req_data = request.get_json()
    req_data = req_data["id"]
    comments = getAllComments(ObjectId(req_data))
    return jsonify({"comments": comments})

@app.route("/getProfileInfo", methods=['POST'])
def getProfileInfo():
    req_data = request.get_json()
    req_data = req_data["mail"]
    ct, subjects, repMgr, reprMgrName = getInfo(req_data)
    return jsonify({"classTeacher": ct, "subjects":subjects, "reportingManagerEmail":repMgr, "reportingManagerName":reprMgrName})

@app.route("/student_list", methods=["POST"])
def s_list():
    data = request.get_json()
    slist = student_list(data["data"])
    return jsonify({"message":"milgaya", "data":slist})

@app.route("/qrcode", methods=["POST"])
def qr():
    data = request.get_json()
    getqr = qrsearch(data["data"])
    return jsonify({"data":getqr})

@app.route("/attendace",methods=["POST"])
def attendace():
    req_data = request.get_json()
    c = req_data['class']
    if c == "1a" or c== "1b" or c== "1c" or c== "1d":
        config.db4.class1.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class1 collection."})
    elif c== "2a" or c== "2b" or c=="2c" or c=="2d":
        config.db4.class2.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class2 collection."})
    elif c== "3a" or c=="3b" or c=="3c" or c=="3d":
        config.db4.class3.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class3 collection."})
    elif c== "4a" or c=="4b" or c=="4c" or c=="4d":
        config.db4.class4.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class4 collection."})
    elif c== "5a" or c=="5b" or c=="5c" or c=="5d":
        config.db4.class5.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class5 collection."})
    elif c== "6a" or c=="6b" or c=="6c" or c=="6d":
        config.db4.class6.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class6 collection."})
    elif c== "7a" or c=="7b" or c=="7c" or c=="7d":
        config.db4.class7.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class7 collection."})
    elif c== "8a" or c=="8b" or c=="8c" or c=="8d":
        config.db4.class8.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class8 collection."})
    elif c== "9a" or c=="9b" or c=="9c" or c=="9d":
        config.db4.class9.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class9 collection."})
    elif c== "10a" or c=="10b" or c=="10c" or c=="10d":
        config.db4.class10.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Class10 collection."})
    elif c== "nursery":
        config.db4.nursery.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into nursey collection."})
    elif c== "L.K.G":
        config.db4.lkg.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into L.K.G collection."})
    elif c== "U.K.G":
        config.db4.ukg.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into U.K.G collection."})
    else:
        config.db4.garbage.insert_one(req_data).inserted_id
        return jsonify({"message":"data inserted into Garbage collection."})

@app.route("/filter", methods=["POST"])
def a_filter():
    req_data = request.get_json()
    cc=req_data["data"]["cc"]
    date=req_data["data"]["date"]
    st=req_data["data"]["st"]
    et=req_data["data"]["et"]
    sub=req_data["data"]["sub"]
    data1 = attendacne_filter(cc, date, st, et, sub)
    return jsonify({"message":"Data Retrived Sucessfully","data" : repr(data1)})

@app.route("/teacherAttendance",methods=["POST"])
def teacherLogin():
    req_data = request.get_json()
    print(req_data)
    insertStatus=[]
    for i in config.teachers.find():
        if req_data["data"]["mail"] == i["data"]["mail"] and req_data["data"]["Cls"] == i["data"]["Cls"] and req_data["data"]["sub"] == i["data"]["sub"]:
            print("Data to be Updated")
        if req_data["data"]["mail"] != i["data"]["mail"] and req_data["data"]["Cls"] != i["data"]["Cls"] and req_data["data"]["sub"] != i["data"]["sub"]:
            print("Data to be Inserted")
            insertStatus.append(False)
        else:
            insertStatus.append(True)
    if True in insertStatus:
        js = req_data["data"]["loginTime"]
        temp = {}
        for key, value in i.items():
            if key not in ["_id"]:
                temp[key]=value
        old = copy.deepcopy(temp)
        new = copy.deepcopy(temp)
        new["data"]["logoutTime"]=js
        edit = config.teachers.replace_one(old,new)
        return jsonify({"message":"updated updated updated"})
    else:
        teachers.insert_one(req_data).inserted_id
        return jsonify({"message":"yes  yes  yes"})

app.run(debug=True, port=5000, host="0.0.0.0")