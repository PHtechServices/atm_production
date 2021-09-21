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
collectionStaff = db.Staff
collectionResponsibilities = db.Responsibilities

def userNameCheck(userName):
    roleID = []
    for doc in collection.find():
        if userName == doc["UserDetails"]["userName"]:
            roleID.append(doc["UserDetails"]["userRole"])
            return("Success",roleID)

def passwordCheck(password):
    for doc in collection.find():
        if password == doc["UserDetails"]["password"]:
            return("Success")

def task_assigned(assigned):
    data= []
    for doc in collection1.find():
        if assigned == doc["task"]["tak Assiged to"]:
            data.append(doc["task"])
            tbd = "Success"
    return tbd,data

def task_approver(approver):
    data1= []
    for doc in collection1.find():
        if approver == doc["task"]["Task Approval require to complete"]:
            data1.append(doc["task"])
            ok = "Success"
            return ok,data1

#Login_check
@app.route("/login", methods=['POST'])
def loginTest():
    details = request.get_json()["userDetails"]
    userName,roleID = userNameCheck(details["userName"])
    passwordN = passwordCheck(details["password"])
    if userName == "Success":
        if passwordN == "Success":
            return jsonify({"message":"Congratualtion for Login",
            "roles":roleID[-1]})
        else:
            return jsonify({"message":"UserName or Password is Incorrect",
            "roles":"Not Defined"})
    else:
        return jsonify({"message":"UserName or Password is Incorrect",
            "roles":"Not Defined"})


#Create User
@app.route("/createuser", methods=['POST'])
def insert_document():
    req_data = request.get_json()
    collection.insert_one(req_data).inserted_id
    return jsonify({"message":"Congratualtions user inserted Sucessfully..."})

#Create task
@app.route("/creattask", methods=['POST'])
def task():
    req_data = request.get_json()
    collection1.insert_one(req_data).inserted_id
    return jsonify({"message":"Task created Sucessfully..."})

#task_Assign
@app.route("/taskassign", methods=['POST'])
def task_assign():
    assignee = request.get_json()
    print(assignee)
    assign,data = task_assigned(assignee["assigned"])
    print(assign)
    if assign == "Success":
        return jsonify({"message":"tasks are assigned","data":data})
    else:
        return jsonify({"message":"tasks are not assigned"})

#task_Approve
@app.route("/taskapprove", methods=['POST'])
def taskapproved():
    approver = request.get_json()
    print(approver)
    approve,data1 = task_approver(approver["assigned"])
    print(approve)
    if approve == "Success":
        return jsonify({"message":"tasks are assigned","data":data1})
    else:
        return jsonify({"message":"tasks are not assigned"})

def getStaffType(staffType):
    staffList = []
    for doc in collectionStaff.find():
        if staffType == doc["staffType"]:
            staffList = doc["staffDepartment"]
            return(staffList)

#Get Staff Details
@app.route("/staffDetails", methods=['POST'])
def getStaffDetails():
    staffType = request.get_json()["staffType"]
    staffList = getStaffType(staffType)
    return jsonify({"staffList":staffList})

def getResponsibilities(department):
    responsibilities = []
    for doc in collectionResponsibilities.find():
        if department == doc["department"]:
            responsibilities = doc["responsibilities"]
            return(responsibilities)

#Get Staff Details
@app.route("/department", methods=['POST'])
def getDepartment():
    department = request.get_json()["department"]
    responsibilities = getResponsibilities(department)
    return jsonify({"responsibilities":responsibilities})


app.run()