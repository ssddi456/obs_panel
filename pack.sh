set -e

# https://nodejs.org/api/single-executable-applications.html#single-executable-applications
# need node 20.1
npm run build-server
node --experimental-sea-config sea-config.json

cp $(command -v node) obs_panel 
codesign --remove-signature obs_panel
npx postject obs_panel NODE_SEA_BLOB obs_panel.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
    --macho-segment-name NODE_SEA 
codesign --sign - obs_panel
mv obs_panel dist/server/obs_panel