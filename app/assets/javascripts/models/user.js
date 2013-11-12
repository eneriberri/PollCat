PollCatApp.Models.User = Backbone.Model.extend({
  parse: function(data) {
    data.polls = new PollCatApp.Collections.Polls(data.polls);
    return data;
  }

})