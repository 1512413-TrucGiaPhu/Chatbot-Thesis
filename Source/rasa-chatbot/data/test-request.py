import requests
name = 'ROG Phone 2'
url = f"http://localhost:3030/api/productsearch/?name={name}" ##change rasablog with your app name

x = requests.get(url)
print(x.json())