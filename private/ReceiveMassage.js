var assert = require('assert');
module.exports={
  ReceiveMassage : function(db,room,callback) {
    var collection = db.collection('Massages');
   console.log(room);
    collection.find({NumRoom:room}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");

      callback(docs);
    });
  }
}