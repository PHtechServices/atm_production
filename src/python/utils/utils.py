import config
import hashlib

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
    config.eventTemplate["description"] = req_data["task description"]
    config.eventTemplate["summary"] = req_data["task description"]
    config.eventTemplate["start"]["dateTime"] = req_data["task deadline"]+"T09:00:00-07:00"
    config.eventTemplate["end"]["dateTime"] = req_data["task deadline"]+"T09:00:00-07:00"
    event = service.events().insert(calendarId='primary', body=config.eventTemplate).execute()
    print( 'Event created: %s' % (event.get('htmlLink')))

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