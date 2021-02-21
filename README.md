# hitomi-la-scrapper

yarn install

yarn sequelize db:migrate (setup sequalize and sequelize-cli, if fails)

yarn start 

move to http://localhost:3000/scrapper

wait for scrapping proccess as long, as you want

close modal window and check public/downloads. You can find downloaded images here and open in in browser by link: http://localhost:3000/downloads/${id}/${index}.jpg, where id is an name of directory and index is a number of image
