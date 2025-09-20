<div align="center">

# Event Ticket Management
</div>

## Overview

Web application using django, react, typescript.

Applicaton For Event Ticket Management Tool


## Cloning the repository

- Clone the repository using the command below :

```bash
git clone https://github.com/jaymind2810/event_ticketing_app.git

```

## Django Configuration:

- Move into the directory where we have the project files : 


```bash
cd event_ticketing_app/eta_backend
```

- Create a virtual environment :
```bash
# Let's install virtualenv first
sudo apt install python3-venv

# Then we create our virtual environment
python3 -m venv venv
```

- Activate the virtual environment :
```bash
source venv/bin/activate
```

- Install the requirements :
```bash
pip install -r requirements.txt
```

- Create .env file and Add env.example variable data.

#

### Running the App

- for make migrations the App
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

- for create super user for App
```bash
python3 manage.py createsuperuser
```

- for run server
```bash
python3 manage.py runserver
```

- Then, the development server will be started at http://127.0.0.1:8000/



## React Configuration:


- Move into the directory where we have the project files : 


```bash
cd event_ticketing_app/eta_frontend

```


- for install node modules
```bash
npm install
```

- for run server
```bash
npm run dev
```

- Then, the development server will be started at http://localhost:5173/