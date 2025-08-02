async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const imageContainer = document.getElementById("generatedImage");
  const downloadSection = document.getElementById("downloadSection");

  imageContainer.innerHTML = "<p class='placeholder-text'>Generating...</p>";
  downloadSection.style.display = "none";

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (data.image) {
      const img = new Image();
      img.id = "generatedImg";
      img.src = `data:image/png;base64,${data.image}`;
      img.alt = "Generated Image";
      imageContainer.innerHTML = "";
      imageContainer.appendChild(img);
      downloadSection.style.display = "block";
    } else {
      imageContainer.innerHTML = "<p class='placeholder-text'>Failed to generate image.</p>";
    }
  } catch (error) {
    console.error("Error:", error);
    imageContainer.innerHTML = "<p class='placeholder-text'>An error occurred.</p>";
  }
}

function downloadImage() {
  const img = document.getElementById("generatedImg");
  if (!img) return;

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "ai_generated_image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
