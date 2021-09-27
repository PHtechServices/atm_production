import requests, json
import webbrowser

authorize_url = "https://accounts.google.com/o/oauth2/auth"
token_url = "https://accounts.google.com/o/oauth2/token"
state = ''
scope = 'https://www.googleapis.com/auth/admin.directory.user'
callback_uri = "https://sachin.googleapis.com/"
test_api_url = "https://tcfhirsandbox.com.au/fhir/dstu2/Patient?identifier=RN000000200"
client_id = '245105445284-3ip1e81ou4bpid0gs2fbrkhcg5vvddm0.apps.googleusercontent.com'
client_secret = 'x6hqWHRx_AtxtkLfavKhZb3G'

authorization_redirect_url = authorize_url + '?response_type=code' + '&client_id=' + client_id +'&redirect_uri=' + callback_uri + '&scope='+scope
# print(authorization_redirect_url)

# authorization_code = input("Code:")
# data = {'grant_type': 'authorization_code', 'code': authorization_code, 'redirect_uri': callback_uri}
access_token_response = requests.get(authorization_redirect_url)
tokens = json.loads(access_token_response.text)
access_token = tokens['access_token']

api_call_headers = {'Authorization': 'Bearer ' + access_token}
api_call_response = requests.get(test_api_url, headers=api_call_headers, verify=True)

print(api_call_response.status_code)
print (api_call_response.text)