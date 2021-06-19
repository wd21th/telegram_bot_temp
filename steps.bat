git init
git add .
git commit -m "Initial express app"

heroku create
heroku config:add NODE_ENV=production
git push heroku master
heroku open

heroku logs --tail