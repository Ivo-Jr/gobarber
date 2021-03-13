
<h1 align="center">
    <img alt="gobarber" src="src/assets/img/gobarber.png" width="300px" />
</h1>



<h4 align="center">
  An API that helps you schedule salon services
</h4>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-other-tools">Other tools</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;    
</p>



## :rocket: Technologies

This project was developed with the following technologies:

- [NodeJs](https://nodejs.org/en/)
- [Docker](https://hub.docker.com/_/postgres)
- [Postbird](https://www.electronjs.org/apps/postbird)
- [Insominia](https://insomnia.rest/download)
- [Sequelie](https://sequelize.org/master/manual/getting-started.html)
- [Prettier](https://prettier.io/)
- [Postgres](https://www.postgresql.org/)
- [mongoDB-Compass](https://www.mongodb.com/products/compass)
- [express](https://expressjs.com/pt-br/)
- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]


## :&#128296: Other tools

This project was developed with the following tools:

- [nodemailer](https://nodemailer.com/about/)
- [redis](https://github.com/NodeRedis/node-redis)
- [jwt](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [date-fns](https://date-fns.org/)
- [bee queue](https://github.com/bee-queue/bee-queue)
- [Yup](https://reactjs.org/)
- [Multer](https://www.npmjs.com/package/multer)

## :information_source: How To Use


To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v12.18.4][nodejs] or higher + [Yarn v1.22][yarn] or higher installed on your computer. From your command line:


```bash
# Clone this repository
$ git clone https://github.com/Ivo-Jr/gobarber.git

# Go into the repository
$ cd gobarber

# Install dependencies 
$ yarn or npm install

# Run the app
$ yarn dev
```


#### To monitor the handling of requests and responses, Install:
- [Insomina](https://insomnia.rest/download)

#### To containerize the application install
- [Docker](https://docs.docker.com/docker-hub/)
```bash
# To run the Postgres database, run inside the Docker
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
```
#### To view the data in the database, install
- [Postbird](https://www.electronjs.org/apps/postbird)




---

Made with ♥ by Ivo Junior :wave: [Get in touch!](https://www.linkedin.com/in/jos%C3%A9-ivo-maciel-j%C3%BAnior-658136145/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
