import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
//import morgan from "morgan";

var morgan = require('morgan');
const cors = require('cors');

import TasksRoutes from './src/nodetypes_tareas/routes/api/tasks';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.set('port', process.env.PORT || 3000);
//app.use(morgan('dev'));
app.use(cors());

mongoose.connect("mongodb://localhost/taskmanager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Starting the Server
app.listen(app.get('port'), () => {
  console.log(`Server on port`, app.get('port'));
});

// Routes
app.use('/api/tasks', TasksRoutes);
