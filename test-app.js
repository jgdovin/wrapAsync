if (Meteor.isClient) {
  Template.hello.events({
    "submit #testForm" : function(e, t) {
      e.preventDefault();
      Meteor.call('testAsync', t.$('#inputText').val(), function(err,res) {
        console.log(res);
      });
    }
  })
}

if (Meteor.isServer) {
  var myAsync = function(textToReturn, cb) {
    //wait 3 second to simulate async call.
    setTimeout(function() {
      cb & cb(null, textToReturn);
    }, 3000);
  };

  Meteor.startup(function () {
    Meteor.methods({
      testAsync : function(text) {
        var test = Meteor.wrapAsync(myAsync);

        try {
          return test(text);
        } catch(e) {
          console.log(e);
        }
      }
    });
  });
}
