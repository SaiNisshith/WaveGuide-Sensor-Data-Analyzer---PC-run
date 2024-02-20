const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');
const mongoose = require('./config/mongoose');
const global_variable = require('./models/variables');

const port = process.env.PORT || 7000;
let mainWindow;
const expressApp = express();

expressApp.use(express.static(path.join(__dirname, 'assets')));
expressApp.set('view engine', 'ejs');
expressApp.set('views', path.join(__dirname, 'views'));

async function generate() {
    await global_variable.deleteMany({});
    await global_variable.create({
        high_point: 301,
        low_point: 180,
        min_height: 0.8,
        min_distance: 20,
        no_of_notches: 3
    });
}

expressApp.use('/', require('./routes/index'));

async function startServer() {
    await generate();
    expressApp.listen(port, (err) => {
        if (err) {
            console.log(`Error in running the server: ${err}`);
        }
        console.log(`App listening on port ${port}`);
        createWindow();
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname,'./assets/images/wda-favicon-black.png')
        
    });

    mainWindow.loadURL(`http://localhost:${port}`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', startServer);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
