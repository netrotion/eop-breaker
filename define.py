import requests

endpoint = "https://tool-eop-v3-backend-wszmtm2dda-uc.a.run.app"
headers = {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,vi;q=0.8,fr;q=0.7',
            'content-type': 'application/json',
            'origin': 'chrome-extension://imlhhjancockeaeacdfajpmmdpaceilj',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        }
def setAnswers() -> bool:
    D = [
        {
            "question": "1",
            "questionNumber": 0,
            "answer": "1",
            "userId": "000000",
            "major": "1",
            "unit": "0",
            "task": "1"
        }
    ]
    api = f"{endpoint}/task-answer"
    response = requests.post(url=api, json=D, headers=headers)
    print(response.text)

def getAnswers(id):
    api = f"{endpoint}/task-answer/answers"
    json_data = {
        "major": "1",
        "unit": "0",
        "task": "1",
        "userId": id
    }
    response = requests.post(url=api, json=json_data, headers=headers)
    # return response.status_code == 200
    print(response.text)

def collect_major(major):
    api = f"{endpoint}/task-answer/answers/length"
    json_data = {
        "major": major
    }
    response = requests.post(url=api, json=json_data, headers=headers)
    print(response.text)


setAnswers()
getAnswers("000000")
# collect_major("Tiếng anh Công nghệ thông tin cơ bản 2")
# print()
#suggestion
# print("hello ")