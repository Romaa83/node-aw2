import { readFile } from "node:fs";
import { join } from "node:path";

readFile('si.txt', (err,data) => {
    if (err) throw err
    console.log(data.toString())
})
