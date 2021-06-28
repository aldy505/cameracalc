# Camera Calculator

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/00e494d016604f209f78272b6ef9f3c7)](https://www.codacy.com/gh/aldy505/cameracalc/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=aldy505/cameracalc&amp;utm_campaign=Badge_Grade) [![CodeFactor](https://www.codefactor.io/repository/github/aldy505/cameracalc/badge)](https://www.codefactor.io/repository/github/aldy505/cameracalc) ![GitHub](https://img.shields.io/github/license/aldy505/cameracalc)

This is actually an impromptu project on my curiosity at calculating something for film camera. As you know (*or might don't know*), there is no free online camera calculator out there that can calculate some of camera's settings like [ISO](https://www.adobe.com/creativecloud/photography/discover/iso.html), [aperture](https://photographylife.com/what-is-aperture-in-photography), [FPS](https://www.videosurveillance.com/tech/frame-rate.asp), or even [footcandle](https://en.wikipedia.org/wiki/Foot-candle). (*Except ARRI's photometric data, but it's just calculating their light*). **So I made one!**

This project is open source, meaning you can see the actual code. I'm making this an open sourced project because I want to help people and this is just math revisited.

Visit the website [here](https://cameracalc.reinaldyrafli.com/)

## Features

- Calculate Footcandle and [Lux](https://en.wikipedia.org/wiki/Lux) from aperture, FPS, and ISO
- Calculate Aperture from FPS, ISO, and Footcandle/Lux
- Calculate Footcandle and Lux from certain distance with certain lights
- Calculate [Focal Length](https://www.nikonusa.com/en/learn-and-explore/a/tips-and-techniques/understanding-focal-length.html) equivalent from some camera to another camera
- Calculate expected video file size from certain format and duration

## Build from source/code

Before we begin, you must install [Node.js](https://nodejs.org/en/download/) on your computer.

Then, download the repository (the codes) through the green button up above, on the top of the page, you won't miss it. Unzip it and put that somewhere on your computer. But not on your Desktop.

Open up your terminal (Command Prompt for Windows, [Terminal](https://en.wikipedia.org/wiki/Terminal_(macOS)) or [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) or Shell for MacOS). Let's type some things:

```bash
# Change your directory to the repository folder first.
# For Windows users it's:
$ cd /D "C:/the/folder/path/here"

# For Mac/Linux users, it's:
$ cd /the/folder/path/here
# But if the folder is on different directory, please refer to this link:
# https://wp-mix.com/mac-terminal-change-directory-external-drive/

# Let's check if Node.js is properly installed.
# It should output the version number.
$ node -v 

# Install Yarn, better package manager for Node.js first
$ npm install -g yarn

# Let's install all the dependency needed.
$ yarn install

# Let's generate the usable HTML files
$ yarn run generate
```

Voila. You did it. Go to the `/dist` folder that was automatically created, then open the `index.html` file.

## Development

Please feel free to put any request on [issues](https://github.com/aldy505/cameracalc/issues). If you can code and want to add new feature yourself, Pull Requests are always open.

## Changelog

Please refer to the [Release](https://github.com/aldy505/cameracalc/releases) page.

## License

Copyright (C) 2018-present  Reinaldy Rafli

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
[GNU General Public License](https://github.com/aldy505/cameracalc/blob/master/LICENSE) for more details.