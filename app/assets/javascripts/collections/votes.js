PollCatApp.Collections.Votes = Backbone.Collection.extend({
  model: PollCatApp.Models.Vote,
  url: '/votes'
})