import requests
import os

#MAKE IT PROMPTED 

# OpenAI API Key
api_key = os.environ.get("OPENAI_API_KEY")

def get_item(base64_image):
  headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
  }

  payload = {
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Here is a receipt, please scan it and return a json of all of the ingredients you found in it, do it in the format \{ food: amount \}, please ONLY return the JSON, NO EXTRA WRITING WHAT SO EVER. Do not include ANYTHING outside of the json, your return should only be {'name':amount}, not even a markdown json classifier"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": f"data:image/jpeg;base64,{base64_image}"
            }
          }
        ]
      }
    ],
    "max_tokens": 300
  }

  response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

  return response.json()['choices'][0]['message']['content']