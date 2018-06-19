import express = require('express');
import { App } from './App';

require('dotenv').config();

const port = process.env.PORT || 8080;
const host = '0.0.0.0';

let api = new App(express(), port, host);
api.run();