git fetch origin master
git reset --hard FETCH_HEAD
git clean -df
npm install
ng build --prod

