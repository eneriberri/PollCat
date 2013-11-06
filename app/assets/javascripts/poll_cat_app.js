window.PollCatApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //alert('Hello from Backbone!');

    PollCatApp.polls = new PollCatApp.Collections.Polls();
    PollCatApp.polls.fetch({
      success: function() {
        new PollCatApp.Routers.PollRouter({
          "$rootEl": $(".content")
        });
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  PollCatApp.initialize();
});
