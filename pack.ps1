# https://nodejs.org/api/single-executable-applications.html#single-executable-applications
# need node 20.1

rm obs_panel.exe
rm obs_panel.blob
rm dist/obs_panel.exe

npm run build-client

npm run build-server

node --experimental-sea-config sea-config.json

cp (Get-Command node).Source obs_panel.exe 

# signtool remove /s obs_panel.exe 

npx postject obs_panel.exe NODE_SEA_BLOB obs_panel.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 

# signtool sign /fd SHA256 obs_panel.exe 

mv obs_panel.exe dist/obs_panel.exe
rm obs_panel.blob
