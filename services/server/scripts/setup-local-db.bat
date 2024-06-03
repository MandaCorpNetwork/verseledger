echo %~dp0
docker exec -i vl-db sh -c "exec mysqladmin -uroot --password=verseledger-password drop verseledger-app"
docker cp create-db.sh vl-db:create-db.sh
docker exec -i vl-db sh -c "./create-db.sh";
docker cp verseledger-app.sql vl-db:verseledger-app.sql
docker exec -i vl-db sh -c "exec mysql -uroot --password=verseledger-password verseledger-app < verseledger-app.sql"
