import express = require('express');
import { App } from './App';

require('dotenv').config();

let port = process.env.PORT || 3000;
let api = new App(express(), port);
api.run();