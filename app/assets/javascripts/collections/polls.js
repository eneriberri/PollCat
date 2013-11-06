PollCatApp.Collections.Polls = Backbone.Collection.extend({
  model: PollCatApp.Models.Poll,
  url: '/polls'
})