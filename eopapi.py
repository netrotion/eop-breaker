import requests

cookies = {
    'dgtk': 'aS4YMp7nGg1s3h3D+PwzYJGpLmTo5KhoEE8MaT/csI6Cr0IgEuatPMvXDPKvqc0chWFQ9nPVw823sIr3sOxqQjxjTmQF9K4fFiFMPKfOgOGxNB+2km8hoPzpc45u0ushdHt3ej4fEmF5niC0l17etw==',
    'duser': 'faTapoafTafooMaptnlE9pG1pop9aMlc',
    'deopsound': '0',
    'degroup_328': 'dgEnjQKAzOXPryAIB%2BJybLOA/U6JpEyt8wed1F6gf31N4%3D',
}

headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8,fr;q=0.7',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Referer': 'https://eop.edu.vn/study/course/9834FCB5011532F?id=dgKkwZX2JAafKLRc3v9XStxm8IjRoKZypcPMNpQ0Tt%2BMM%3D',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    # 'Cookie': 'dgtk=aS4YMp7nGg1s3h3D+PwzYJGpLmTo5KhoEE8MaT/csI6Cr0IgEuatPMvXDPKvqc0chWFQ9nPVw823sIr3sOxqQjxjTmQF9K4fFiFMPKfOgOGxNB+2km8hoPzpc45u0ushdHt3ej4fEmF5niC0l17etw==; duser=faTapoafTafooMaptnlE9pG1pop9aMlc; deopsound=0; degroup_328=dgEnjQKAzOXPryAIB%2BJybLOA/U6JpEyt8wed1F6gf31N4%3D',
}

response = requests.get(
    'https://eop.edu.vn/apps/noise/chat/history/17673271671220738pfcb395323b70fe',
    cookies=cookies,
    headers=headers,
)

print(response.text)