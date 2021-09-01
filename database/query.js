import connection from "./config.js"

export default function runQuery(query, params = ''){
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if(error){
                reject(error)
            }
            else{
                resolve(results)
            }
        })
    })
}