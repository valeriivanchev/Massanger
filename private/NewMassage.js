assert = require('assert');
module.exports = {

    SendMassage :function(db,massage,Fromuser,Touser,room, callback) {
        var collection = db.collection('Massages');
    
        collection.insertMany([
          {
            Massage:massage,
            Fromusername:Fromuser,
            Tousername:Touser,
            NumRoom:room
          }
        ], function(err, result) {
          assert.equal(err, null);
          console.log("Inserted a document into the collection");
          callback(result);
        });
      }

};