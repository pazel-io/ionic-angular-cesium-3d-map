const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
// Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
// Load node modules
  const colors = require('colors');
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env'
  });
// `environment.ts` file structure
  const envConfigFile = `export const environment = {
  cesiumAccessToken: '${process.env.CESIUM_ACCESS_TOKEN}',
  production: true,
};
`;
  console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  console.log(colors.grey(envConfigFile));
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};

setEnv();
