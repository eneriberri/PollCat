window.PollCatApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');

    var polls = new PollCatApp.Collections.Polls();

    polls.fetch({
      success: function() {
        new PollCatApp.Routers.PollRouter({
          "$rootEl": $("#content"),
          collection: polls
        });
        Backbone.history.start();
      }
    });
  }
};

// $(document).ready(function(){
//   PollCatApp.initialize();
// });
