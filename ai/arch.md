# Flask server architecture

<pre>
/plant_part_api
    ├── app.py                # Main Flask API entry point
    ├── plant_part_detect.py  # Handles model loading and predictions
    ├── auth.py               # JWT Authentication logic
    ├── utils.py              # Utility functions (e.g., image processing)
    ├── requirements.txt      # Python dependencies
    └── Dockerfile            # For containerized deployment

</pre>