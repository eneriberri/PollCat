PollCatApp.Routers.PollRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options['$rootEl'];
  },

  routes: {
    "": "index",
    "polls/new": "new",
    "polls/:id": "show",
    "votes": "all_votes"
  },

  index: function() {
    var indexView = new PollCatApp.Views.PollIndex( { collection: PollCatApp.polls } );
    this.$rootEl.html(indexView.render().$el);
  },

  show: function(id) {
    var poll = PollCatApp.polls.get(id);
    var showView = new PollCatApp.Views.PollShow( { model: poll } );
    this.$rootEl.html(showView.render().$el);
  },

  new: function() {
    var newView = new PollCatApp.Views.PollNew();
    this.$rootEl.html(newView.render().$el);
  },

  all_votes: function() {
    var votesView = new PollCatApp.Views.VoteIndex( { collection: PollCatApp.votes });
    this.$rootEl.html(votesView.render().$el);
  }
})