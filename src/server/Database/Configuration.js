const mysql = require('mysql');


exports.db = {
    conn : mysql.createConnection({
        host : "40.79.129.1",
        user : "mentalix@mentalix",
        password : "M414-les3bgs"
    }),
    /***
     *
     * @param query
     * @param callback
     */
    fetch : function (query,callback){
        this.conn.query(query,(err,result)=>callback(result,err));
    },
}
