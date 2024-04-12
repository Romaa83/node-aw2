import { match } from "node:assert"
import os from "node:os"


// console.log(Math.round((os.totalmem()- os.freemem())/1024/1024/1024));

const Calculo = () => {
    return Math.round((os.totalmem()- os.freemem())/1024/1024/1024)
}

console.log(Calculo())