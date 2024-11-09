import http.client

conn = http.client.HTTPSConnection("celestial-objects.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "cb92db4fd3mshc8a9ae32c6b8c05p12c489jsn9daf765907ec",
    'x-rapidapi-host': "celestial-objects.p.rapidapi.com"
}

conn.request("GET", "/planets/%7Bname%7D", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))