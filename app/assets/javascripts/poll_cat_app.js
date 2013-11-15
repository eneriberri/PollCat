window.PollCatApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    PollCatApp.polls = new PollCatApp.Collections.Polls();
    PollCatApp.votes = new PollCatApp.Collections.Votes();
    PollCatApp.users = new PollCatApp.Collections.Users();

    PollCatApp.COLORS = ["#C3E86B", "#FF4242", "#6fc69c", "#00B4FF", "#4c4c4c", //"#E1EDB9"
                         "#FA6900", "#9DE0AD", "#69D2E7", "#D34017", "#D9042B",
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
