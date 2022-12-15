# Audio to text using openai/whisper

Whisper is a general-purpose speech recognition model. We will be using nodejs to transcribe audio file to text.

## Steps to follow

# Installation and setup

- git clone this repo
- change access permission of git folder using `chmod -R 777 _folderName_`
- cd into _folderName_ and run `npm install`

# Running app in development environment
- do `npm start`
- Open url localhost:3000
- Record audio and test the feature

# Running app in production environment
- install pm2
- run `npm run build`
- start next server `pm2 start npm name "protoflow_site" -- start` 
    important : use same command

- setup nginx reverse proxy to server nodejs server on localhost:3000
- Increase nginx upload size limit by
    - sudo vim /etc/nginx/nginx.conf
    - http {
        ...
        client_max_body_size 100M;
    }
    - save and restart nginx `sudo systemctl restart nginx`

- Setup reverse proxy inside sites-available
    location /{
        proxy_pass http://127.0.0.1:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade; 
    }

# important git commands for storing git config
git config --global credential.helper store
