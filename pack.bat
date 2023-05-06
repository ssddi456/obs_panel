rem https://nodejs.org/api/single-executable-applications.html#single-executable-applications
rem need node 20.1
npm run build-server
node --experimental-sea-config sea-config.json

for /F "tokens=*" %n IN ('where.exe node') DO @(copy "%n" obs_panel.exe)

signtool remove /s obs_panel.exe 

npx postject obs_panel.exe NODE_SEA_BLOB obs_panel.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 

signtool sign /fd SHA256 obs_panel.exe 

mv obs_panel dist/server/obs_panel
