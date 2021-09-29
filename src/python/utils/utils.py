import config
import hashlib
from googleapiclient.discovery import build
# from google_auth_oauthlib.flow import InstalledAppFlow
# from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from bson import ObjectId
import requests
import json

def userNameCheck(userName):
    uName = []
    mailID = []
    for doc in config.collection.find():
        if userName == doc["primaryEmail"]:
            uName.append(doc["name"]["givenName"])
            mailID.append(doc["primaryEmail"])
            return("Success", uName, mailID)


def passwordCheck(password):
    for doc in config.collection.find():
        if sha(password) == doc["password"]:
            return("Success")


def task_assigned(assigned):
    data = []
    for doc in config.collection1.find():
        print(doc)
        if assigned == doc["task assigned to"]:
            data.append(doc["task description"])
            tbd = "Success"
    return tbd, data


def task_approver(approver):
    data1 = []
    for doc in config.collection1.find():
        if approver == doc["task"]["Task Approval require to complete"]:
            data1.append(doc["task"])
            ok = "Success"
            return ok, data1


def getStaffType(staffType):
    staffList = []
    for doc in config.collectionStaff.find():
        if staffType == doc["staffType"]:
            staffList = doc["staffDepartment"]
            return(staffList)


def getResponsibilities(department):
    responsibilities = []
    for doc in config.collectionResponsibilities.find():
        if department == doc["department"]:
            responsibilities = doc["responsibilities"]
            return(responsibilities)


def createCalendarEvent(req_data):
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    creds = None
    creds = Credentials.from_authorized_user_file(f"token.json", SCOPES)
    service = build('calendar', 'v3', credentials=creds)
    config.eventTemplate["description"] = req_data["task description"]
    config.eventTemplate["summary"] = req_data["task description"]
    config.eventTemplate["start"]["dateTime"] = req_data["task deadline"] + \
        "T09:00:00-07:00"
    config.eventTemplate["end"]["dateTime"] = req_data["task deadline"] + \
        "T09:00:00-07:00"
    event = service.events().insert(calendarId='primary',
                                    body=config.eventTemplate).execute()
    print('Event created: %s' % (event.get('htmlLink')))


def sha(password):
    result = hashlib.sha1(password.encode())
    return result.hexdigest()


def fetchrole(email):
    for i in config.collection.find():
        if email == i["primaryEmail"]:
            user = (i["organizations"][0]["title"])
    for j in config.collection2.find():
        if user == j["users"][0]:
            role = (j["role"])
            return(role)

def getstatus(taskID):
    data = {}
    for i in config.collection1.find():
        if taskID == i["_id"]:
            status = i["task status"]
            break
    for j in config.collectionStatus.find():
        if status == j["title"]:
            data["componentsInput"] = j["componentsInput"]
            data["title"] = j["title"]
            data["componentsButtons"] = j["componentsButtons"]
            data["componentsUpload"] = j["componentsUpload"]
            data["message"] = j["message"]
            data["buttonValue"] = j["buttonValue"]
            break
    return status, data

def editjson(obj, newMsg, key):
    url = "http://127.0.0.1:5000/getjson"

    payload = json.dumps({
    "objid": "6152f2c8a4108f019de6a328"
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    old = response.json()["json"]
    new = response.json()["json"]

    new[key] = newMsg
    for i in config.collection1.find():
        if obj == i["_id"]:
            edit = config.collection1.replace_one(old,new)          
    return edit

def getJson(objid):
    data={}
    for i in config.collection1.find():
        if objid == i["_id"]:
            for key, value in i.items():
                if key not in ["_id"]:
                    data[key]=value
            return data