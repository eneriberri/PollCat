window.PollCatApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //alert('Hello from Backbone!');

    PollCatApp.polls = new PollCatApp.Collections.Polls();
    PollCatApp.votes = new PollCatApp.Collections.Votes();
    PollCatApp.textCode = 0;
    //neon yellow ? , red, cream, bright blue, deep gray, deep bright orange, mint green, turquoise bright blue => #69D2E7
    PollCatApp.COLORS = ["#C3E86B", "#FF4242",
              "#E1EDB9", "#00B4FF",
              "#4c4c4c", "#FA6900",
              "#9DE0AD", "#69D2E7",
              "#D34017", "#FC354C"];

    PollCatApp.polls.fetch({
      success: function() {
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
