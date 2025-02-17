from pymongo.mongo_client import MongoClient
import certifi
import json
import ssl

#store server access string in var
uri = "mongodb+srv://Username:Password@skibidib.tglycud.mongodb.net/?retryWrites=true&w=majority&appName=skibidib"
# Create a new client and connect to the server
cluster = MongoClient(uri, tls=True, tlsCAFile=certifi.where())

#pull all documents in collection
db = cluster["skibidib"]
collection = db["skibidibb"]

#update document with dict2 from frontend
def update(changes):
    fridge = collection.find_one({"_id": 0})
    changes = json.loads(changes)

    updated_fridge = {key: fridge.get(key, 0) + changes.get(key, 0) for key in set(fridge) | set(changes)}

    collection.replace_one({"_id":0}, updated_fridge)  

    return updated_fridge