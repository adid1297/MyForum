# Use an official Python runtime as a parent image
FROM python:3.6
RUN apt-get update

# Set the working directory to /app
WORKDIR /api

# Copy the current directory contents into the container at /app
COPY . /api

# Install any needed packages specified in requirements.txt
RUN pip3 install --trusted-host pypi.python.org -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_ENV docker

# Run app.py when the container launches
CMD ["python", "app.py"]