import json
from pymongo import MongoClient


client = MongoClient("mongodb+srv://himanshu:himanshu@cluster0.ebjdo.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-13hnoa-shard-0&w=majority&readPreference=primary&retryWrites=True",
                     tlsAllowInvalidCertificates=True, tls=True)
db = client.AtmPohu
collection = db.Users
collection1 = db.Task
collectionStaff = db.Staff
collectionResponsibilities = db.Responsibilities
collection2 = db.Roles
collectionStatus = db.TaskStatus
collectionClassInfo = db.ClassInfo
collectionTeacherAssignments = db.teacherAssignments

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