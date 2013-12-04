window.PollCatApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    PollCatApp.polls = new PollCatApp.Collections.Polls();
    PollCatApp.votes = new PollCatApp.Collections.Votes();
    PollCatApp.users = new PollCatApp.Collections.Users();

     PollCatApp.COLORS =  ["#ecfa00", "#ff5000", "#38f4bc", "#56beff", "#4c4c4c",
                           "#FF7900", "#B3FFC5", "#FF30DF", "#F2491A", "#D9042B",
                           "#9A46D9", "#9DD93E", "#B1CDED", "#459C7D", "#F4CB89",
                           "#ED3388", "#F4CB31"];

    PollCatApp.polls.fetch({
      success: function() {
        PollCatApp.users.fetch();
        PollCatApp.votes.fetch({
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
