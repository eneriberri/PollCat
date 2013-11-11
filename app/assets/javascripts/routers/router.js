PollCatApp.Routers.PollRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options['$rootEl'];
  },

  routes: {
    "": "index",
    "polls/new": "new",
    "polls/:id/edit": "edit",
    "polls/:id": "show",
    "votes": "all_votes"
  },

  index: function() {
    var indexView = new PollCatApp.Views.PollIndex( { collection: PollCatApp.polls } );
    this.$rootEl.html(indexView.render().$el);
  },

  show: function(id) {
    var poll = PollCatApp.polls.get(id);
    var votes = PollCatApp.votes.where({ poll_id: parseInt(id) });

    var vote_freq = {};
    for(var i = 0; i < votes.length; i++) {
      var vote = parseInt(votes[i].attributes["msg"]);
      if(typeof vote_freq[vote] != 'undefined')
        vote_freq[vote]++;
      else
        vote_freq[vote] = 1;
    }

    var showView = new PollCatApp.Views.PollShow( { model: poll,
                                                    collection: PollCatApp.votes,
                                                    textCode: PollCatApp.textCode,
                                                    voteFreq: vote_freq,
                                                    id: id } );

    this.$rootEl.html(showView.render().$el);
  },

  new: function() {
    var newView = new PollCatApp.Views.PollNew();
    this.$rootEl.html(newView.render().$el);
  },

  edit: function(id) {
    var poll = PollCatApp.polls.get(id);
    var editView = new PollCatApp.Views.PollEdit( { model: poll } );
    this.$rootEl.html(editView.render().$el);
  },

  all_votes: function() {
    var votesView = new PollCatApp.Views.VoteIndex( { collection: PollCatApp.votes });
    this.$rootEl.html(votesView.render().$el);
  }
})