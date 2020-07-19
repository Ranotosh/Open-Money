var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost/EmployeeDB';
var str = "";
app.route('/Employeeid').get(function (req, res) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('Employee');
        var cursor=db.collection('Employee').find({});
        str="";
        cursor.each(function(err,item){
            if(item!=null){
                str = str + "    Employee id  " + item.Employeeid + "</br>";

            }
            else throw(err)
        },
            function(err) {
                res.send(str)
                db.close();

            }
        )
     
      
    })
})
var server = app.listen(8080, function() {});
