/*******************************************************************************
DigiBird Blog

Functions used by multiple javascript files. These are used throughout the
application as helper tools.
*******************************************************************************/

module.exports = {
    dumpToFile: function (debugFile, dataInfo, data) {
        var fs = require('fs');
        var util = require('util');
        var path = require('path');

        var logFile = fs.createWriteStream(path.resolve(__dirname, '..', debugFile),
                    {flags: 'w'});

        var date = new Date();
        var harvestDate = date.getFullYear() + "-" + date.getMonth() + "-" +
            date.getDate() + " " + date.getHours() + ":" +
            date.getMinutes() + ":" + date.getSeconds();

        logFile.write("-------------------------\n");
        logFile.write(dataInfo + " " + harvestDate + "\n");
        logFile.write("-------------------------\n");
        logFile.write(util.format(data));
        logFile.write("\n-------------------------\n");

        // this closes to soon, why is the write async?
        // logFile.close();
    }
};
