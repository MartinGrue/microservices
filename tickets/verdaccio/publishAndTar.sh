npm version patch &&
npm run build &&
npm publish --registry http://localhost:4873 &&
docker run --rm --volumes-from verdaccio -v $(pwd):/backup busybox tar cvf /backup/backup.tar /verdaccio/storage/data/@scope