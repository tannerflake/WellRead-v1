import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path'; //added
import sequelize from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/dist'))); //added

app.use(routes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html')); //added
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});