from flask import Flask, request, jsonify
from database import update, collection
from agent import agent_executor
from fileClassify import get_item
from flask_cors import CORS

app = Flask(__name__)
recipie = ""

CORS(app)

@app.route("/get-fridge", methods=['GET', 'POST'])
def get_fridge():
    try:
        if request.method == 'GET':
            return jsonify(collection.find_one({"_id": 0}))
        else:
            return 'no request found'

    except Exception as e:
        return f"error {e}"
    

@app.route("/get-rec", methods=['GET', 'POST'])
def get_rec():
    global recipie
    try:
        if request.method == 'GET':
            return jsonify({'recipe':recipie})
        else:
            return 'no recipie found'

    except Exception as e:
        return f"error {e}"


@app.route("/upload-image", methods=["GET", "POST"])
def transcribe():
    try:
        data = request.get_json()
        if 'image' in data:
            img = data['image']
            written = get_item(img)
            update(written)
            print("working")
            return 'success'
        else:
            return 'no image found'

    except Exception as e:
        return f"error {e}"


@app.route("/update", methods=['GET', 'POST'])
def update_it():
    try:
        data = request.get_json()
        print(data)
        update(data)
        print("working")
        return 'updated!'


    except Exception as e:
        return f"error {e}"
    

@app.route("/chat", methods=['GET', 'POST'])
def chat():
    global recipie
    try:
        data = request.get_json()
        if 'message' in data:
            prompt = data['message']
            response = agent_executor.invoke({"input":prompt})
            recipie = response['output']

            return jsonify(response['output'])
        else:
            return 'no prompt found'

    except Exception as e:
        return f"error {e}"
    
if __name__ == "__main__":
    app.run(debug=True)