PollCatApp.Collections.Polls = Backbone.Collection.extend({
  model: PollCatApp.Models.Polls,
  url: '/polls'
})