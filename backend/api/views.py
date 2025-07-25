# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from google import genai



client = genai.Client(api_key="AIzaSyDtkxPX0fwTXinqxFjQX8s6eKYc8yuLQss")

@api_view(["POST"])
def generate(request):
    user_prompt = request.data.get("prompt", "")

    if not user_prompt:
        return Response({"error": "Prompt is required."}, status=400)

    try:
        response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents= user_prompt
        )

        return Response({"response": response.text})
    except Exception as e:
        return Response({"error": str(e)}, status=500)
