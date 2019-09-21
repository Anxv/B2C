const dateFormat = require('dateformat');
const path = require('path');

module.exports = {
    dateFormat(timestamp) {
        return dateFormat(new Date(timestamp), 'yyyy-mm-dd HH:MM:ss');
    },
    url200(pathName) {
        return pathName + '_200x200' + path.extname(pathName);
    }
}