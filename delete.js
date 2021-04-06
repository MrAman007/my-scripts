"use strict";

const fs = require("fs");
const path = require("path");

const input = process.argv.slice(2);

switch (input[0]) {
    case "help":
        console.log(`Script to delete files of given extension from inside a given folder and its subfolders
Commands:
	1. node delete.js deleteAll <directory path> <.extension-name>
	2. node delete.js help
		`);
        break;
    case "deleteAll":
        deleteAll();
        console.log("deleted all");
        break;
    default:
        console.log(
            "Invalid arguments: use help to get list of available commands"
        );
}

function deleteAll() {
    let dirPath = path.resolve(input[1]);
    let extension = input[2];

    function deleteExtension(dirPath, extension) {
        if (isFile(dirPath)) {
            if (path.extname(dirPath) === extension) {
                fs.unlinkSync(dirPath);
            }
        } else {
            const contents = getContents(dirPath);
            for (let i = 0; i < contents.length; i++) {
                let childPath = path.join(dirPath, contents[i]);
                deleteExtension(childPath, extension); // recursively calling for subdirectories
            }
        }
    }

    function getContents(dirPath) {
        return fs.readdirSync(dirPath);
    }

    function isFile(dirPath) {
        return fs.lstatSync(dirPath).isFile();
    }

    //calling function
    deleteExtension(dirPath, extension);
}
