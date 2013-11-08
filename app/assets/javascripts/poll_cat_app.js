window.PollCatApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //alert('Hello from Backbone!');

    PollCatApp.polls = new PollCatApp.Collections.Polls();
    PollCatApp.votes = new PollCatApp.Collections.Votes();

    PollCatApp.votes.fetch({
      success: function() {
        PollCatApp.polls.fetch({
          success: function() {
            new PollCatApp.Routers.PollRouter({
              "$rootEl": $(".content")
            });
            Backbone.history.start();
          }
        });

      }
    });


  }
};

$(document).ready(function(){
  PollCatApp.initialize();
});
