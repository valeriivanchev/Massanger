  var assert = require('assert');
module.exports={
    AllAccounts : function(db, callback) {
     var collection = db.collection('Accounts');
     collection.find({}).toArray(function(err, docs) {
       assert.equal(err, null);
       console.log("Found the following records");
 
       callback(docs);
     });
   }
}