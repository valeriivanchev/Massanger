assert = require('assert');
module.exports = {

    MakeAccount :function(db,username, callback) {
        var collection = db.collection('Accounts');
    
        collection.insertMany([
          {
            username:username
          }
        ], function(err, result) {
          assert.equal(err, null);
          console.log("Account added!!!");
          callback(result);
        });
      },
      FindExistingAccount : function(db,username, callback) {
        console.log(username);
                var collection = db.collection('Accounts');
                collection.find({username:username}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");

                callback(docs);
                });
    } 

};