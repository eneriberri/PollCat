PollCatApp.Models.Poll = Backbone.Model.extend({
  parse: function(data) {
    debugger;
    data.answers = new PollCatApp.Collections.Answers(data.answers, {parse: true});
    return data;
  }
})