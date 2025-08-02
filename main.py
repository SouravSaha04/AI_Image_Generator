import os
from diffusers import DiffusionPipeline
import torch
from flask import Flask, request, jsonify, render_template
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)

# ✅ Safe local cache directory inside the app folder
hf_cache_dir = os.path.join(os.getcwd(), "cache")
os.makedirs(hf_cache_dir, exist_ok=True)
os.environ["HF_HOME"] = hf_cache_dir

# Load model
model_repo_id = "stabilityai/sdxl-turbo"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

pipe = DiffusionPipeline.from_pretrained(
    model_repo_id,
    torch_dtype=torch_dtype,
    cache_dir=hf_cache_dir
)
pipe.to("cuda" if torch.cuda.is_available() else "cpu")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    prompt = request.json["prompt"]
    image = pipe(prompt).images[0]

    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return jsonify({"image": img_str})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)