# Axiegg store front
2. Redux as store management with duck methodology
3. Styling made with CSS/SASS modules `module.sass` or with standard CSS/SASS `.sass`.

##### Eslint made with Airbnb config and some custom tweaks
It can be disabled in `./config-overrides.js` by commenting out lines or tweaking it in `./eslintrc`:

#### Install required node modules
```sh
  yarn install
```

#### Run the project locally with react-rewired
```sh
  yarn start
```

#### Building the project. This will create a build folder with the static front end files
```sh
  yarn build
```

#### The build and deploy is managed by TravisCI and settings are available in the
`.travis,yml` file.

