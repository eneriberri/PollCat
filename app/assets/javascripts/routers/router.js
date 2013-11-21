PollCatApp.Routers.PollRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options['$rootEl'];
  },

  routes: {
    "": "index",
    "polls/new": "new",
    "polls/:id": "show"
  },

  index: function() {
    var indexView = new PollCatApp.Views.PollIndex( { collection: PollCatApp.polls } );
    this._swapView(indexView);
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
                                                    voteFreq: vote_freq,
                                                    id: id } );

    this._swapView(showView);
  },

  new: function() {
    var newView = new PollCatApp.Views.PollNew();
	  this._swapView(newView);
  },
  
  _swapView: function(newView) {
	  if(this._prevView) {
		  this._prevView.remove();
	  }
  
	  this._prevView = newView;
	  this.$rootEl.html(newView.render().$el);
  }
})