PollCatApp.Models.Poll = Backbone.Model.extend({
  parse: function(data) {
    data.answers = new PollCatApp.Collections.Answers(data.answers);
    return data;
  }
})