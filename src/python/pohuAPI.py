import requests
import json
from pymongo import MongoClient
from flask import jsonify, request, Flask
from flask_cors import CORS
import flask
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

app = Flask(__name__)
CORS(app)

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar']

creds = None
creds = Credentials.from_authorized_user_file(f"token.json", SCOPES)
# If there are no (valid) credentials available, let the user log in.
service = build('calendar', 'v3', credentials=creds)

client = MongoClient("mongodb+srv://himanshu:himanshu@cluster0.ebjdo.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-13hnoa-shard-0&w=majority&readPreference=primary&retryWrites=True",
                     tlsAllowInvalidCertificates=True, tls=True)
db = client.AtmPohu
collection = db.Users
collection1 = db.Task
collectionStaff = db.Staff
collectionResponsibilities = db.Responsibilities

eventTemplate = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2021-05-28T09:00:00-07:00',
            'timeZone': 'Asia/Kolkata',
        },
        'end': {
            'dateTime': '2021-05-28T17:00:00-07:00',
            'timeZone': 'Asia/Kolkata',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
        ],
        'attendees': [
            {'email': 'pohulabs@srishtiworldschools.in'}
        ],
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }

userDetailsTemplate = {
    "primaryEmail": "test@keyoncompanies.com",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "suspended": False,
    "password": "f7c3bc1d808e04732adf679965ccc34ca7ae3441",
    "hashFunction": "SHA-1",
    "changePasswordAtNextLogin": True,
    "ipWhitelisted": False,
    "ims": [
        {
            "type": "work",
            "protocol": "gtalk",
            "im": "test@keyoncompanies.com",
            "primary": True
        }
    ],
    "emails": [
        {
            "address": "test@keyoncompanies.com",
            "type": "home",
            "customType": "",
            "primary": True
        }
    ],
    "addresses": [
        {
            "type": "work",
            "customType": "",
            "streetAddress": "1600 Amphitheatre Parkway",
            "locality": "Mountain View",
            "region": "CA",
            "postalCode": "94043"
        }
    ],
    "externalIds": [
        {
            "value": "12345",
            "type": "custom",
            "customType": "employee"
        }
    ],
    "relations": [
        {
            "value": "Mom",
            "type": "mother",
            "customType": ""
        },
        {
            "value": "manager",
            "type": "referred_by",
            "customType": ""
        }
    ],
    "organizations": [
        {
            "name": "Google Inc.",
            "title": "SWE",
            "primary": True,
            "type": "work",
            "description": "Software engineer"
        }
    ],
    "phones": [
        {
            "value": "+1 nnn nnn nnnn",
            "type": "work"
        }
    ],
    "includeInGlobalAddressList": True
}


def userNameCheck(userName):
    roleID = []
    for doc in collection.find():
        if userName == doc["primaryEmail"]:
            roleID.append(doc["organizations"][0]["title"])
            return("Success", roleID)


def passwordCheck(password):
    for doc in collection.find():
        if password == doc["primaryEmail"]:
            return("Success")


def task_assigned(assigned):
    data = []
    for doc in collection1.find():
        if assigned == doc["task"]["tak Assiged to"]:
            data.append(doc["task"])
            tbd = "Success"
    return tbd, data


def task_approver(approver):
    data1 = []
    for doc in collection1.find():
        if approver == doc["task"]["Task Approval require to complete"]:
            data1.append(doc["task"])
            ok = "Success"
            return ok, data1

# Login_check


@app.route("/login", methods=['POST'])
def loginTest():
    details = request.get_json()["userDetails"]
    userName, roleID = userNameCheck(details["userName"])
    passwordN = passwordCheck(details["password"])
    if userName == "Success":
        if passwordN == "Success":
            return jsonify({"message": "Congratualtion for Login",
                            "roles": roleID[-1]})
        else:
            return jsonify({"message": "UserName or Password is Incorrect",
                            "roles": "Not Defined"})
    else:
        return jsonify({"message": "UserName or Password is Incorrect",
                        "roles": "Not Defined"})


# Create User
@app.route("/createuser", methods=['POST'])
def insert_document():
    req_data = request.get_json()["UserDetails"]
    userDetailsTemplate["primaryEmail"] = req_data["email"]
    userDetailsTemplate["name"]["givenName"] = req_data["firstName"]
    userDetailsTemplate["name"]["familyName"] = req_data["lastName"]
    userDetailsTemplate["password"] = req_data["password"]
    userDetailsTemplate["addresses"][0]["streetAddress"] = req_data["address"]
    userDetailsTemplate["phones"][0]["value"] = req_data["phone"]
    userDetailsTemplate["organizations"][0]["title"] = req_data["title"]

    url = "https://admin.googleapis.com/admin/directory/v1/users?domain=keyoncompanies.com"

    payload = json.dumps(userDetailsTemplate)
    headers = {
        'Authorization': 'Bearer ya29.a0ARrdaM_EWfJMJwy_EvmLyrAhjphQWVxZOcWKSl596W23wQ5J06UamLu7_NNNVDQeZ7Z49M3L0s8yGMyKXhfn6O00MNsZDXhAuwjN23QpkxVlkP_YqMHWCUJgrLGNhJKyleMmNg7mj6J5_xl3SHULygdkzrD8Ew',
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    collection.insert_one(userDetailsTemplate).inserted_id
    return jsonify({"message": "Congratualtions user inserted Sucessfully..."})

# Create task


@app.route("/creattask", methods=['POST'])
def task():
    req_data = request.get_json()
    collection1.insert_one(req_data).inserted_id
    message = createCalendarEvent(req_data)
    return jsonify({"message": "Task created Sucessfully..."})

# task_Assign


@app.route("/taskassign", methods=['POST'])
def task_assign():
    assignee = request.get_json()
    print(assignee)
    assign, data = task_assigned(assignee["assigned"])
    print(assign)
    if assign == "Success":
        return jsonify({"message": "tasks are assigned", "data": data})
    else:
        return jsonify({"message": "tasks are not assigned"})

# task_Approve


@app.route("/taskapprove", methods=['POST'])
def taskapproved():
    approver = request.get_json()
    print(approver)
    approve, data1 = task_approver(approver["assigned"])
    print(approve)
    if approve == "Success":
        return jsonify({"message": "tasks are assigned", "data": data1})
    else:
        return jsonify({"message": "tasks are not assigned"})


def getStaffType(staffType):
    staffList = []
    for doc in collectionStaff.find():
        if staffType == doc["staffType"]:
            staffList = doc["staffDepartment"]
            return(staffList)

# Get Staff Details


@app.route("/staffDetails", methods=['POST'])
def getStaffDetails():
    staffType = request.get_json()["staffType"]
    staffList = getStaffType(staffType)
    return jsonify({"staffList": staffList})


def getResponsibilities(department):
    responsibilities = []
    for doc in collectionResponsibilities.find():
        if department == doc["department"]:
            responsibilities = doc["responsibilities"]
            return(responsibilities)


@app.route("/department", methods=['POST'])
def getDepartment():
    department = request.get_json()["department"]
    responsibilities = getResponsibilities(department)
    return jsonify({"responsibilities": responsibilities})

def createCalendarEvent(req_data):
    eventTemplate["description"] = req_data["task description"]
    eventTemplate["summary"] = req_data["task description"]
    eventTemplate["start"]["dateTime"] = req_data["task deadline"]+"T09:00:00-07:00"
    eventTemplate["end"]["dateTime"] = req_data["task deadline"]+"T09:00:00-07:00"
    event = service.events().insert(calendarId='primary', body=eventTemplate).execute()
    print( 'Event created: %s' % (event.get('htmlLink')))

app.run(debug=True)