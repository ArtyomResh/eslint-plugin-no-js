# eslint-plugin-filenames-at-folder

Force to name files according to folder name.

## Installing

`npm install eslint-plugin-filenames-at-folder --save-dev`

## ESLint Rules

### filenames-according-to-folder

Name files correct.

## Sample Configuration File

Here's a sample ESLint configuration file that activates these rules:

```
{
  "plugins": [
    "filenames-at-folder"
  ],
  "rules": {
    "filenames-at-folder/filenames-according-to-folder": 2,
  }
}
```
