# AI_Image_Generator
This is an AI-powered image generation web application built using Flask, Stable Diffusion via Hugging Face Diffusers, and PyTorch. The app allows users to input a prompt generates a 256x256 AI-generated image using a state-of-the-art text-to-image model.

Live Link: https://huggingface.co/spaces/SouravSaha26/AI_Image_Generator

Technology:
Frontend: HTML, CSS, JS
Backend: Python, Flask
ML Model: Hugging Face Diffusers, PyTorch
Model Used: stabilityai/sdxl-turbo
Deployment: Docker, Hugging Face Spaces

Features:
Input text prompt and get a generated image
Uses the SDXL-Turbo model to generate fast & quality images
Encodes output as base64 PNG and sends it to frontend
