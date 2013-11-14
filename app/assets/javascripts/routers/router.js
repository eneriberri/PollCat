PollCatApp.Routers.PollRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options['$rootEl'];
  },

  routes: {
    "": "index",
    "polls/new": "new",
    "polls/:id": "show",
    // "sample_poll": "createSamplePoll"
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
                                                    voteFreq: vote_freq,
                                                    id: id } );

    this.$rootEl.html(showView.render().$el);
  },

  new: function() {
    var newView = new PollCatApp.Views.PollNew();
    this.$rootEl.html(newView.render().$el);
  }// ,
//
//   createSamplePoll: function() {
//     // var samplePoll = new PollCatApp.Models.Poll({
//     //   question: "Do you like me?",
//     //   poll_type: "pie",
//     //   user_id: 1,
//     //   urlRoot : '/polls'
//     // });
//     // samplePoll.save();
//
//     PollCatApp.answers.reset([{body: "Yes", poll_id: 25, count: 0, id: 1}, {body: "You betcha", poll_id: 25, count: 0, id: 2}])
//     var answers = [PollCatApp.answers.get(1), PollCatApp.answers.get(2)]
//
//     PollCatApp.polls.add({
//       id: 25,
//       question: "Your couch. Is it mine?",
//       poll_type: "pie",
//       user_id: 1
//     });
//
//     PollCatApp.polls.get(25).save();
//
//     var samplePoll = PollCatApp.polls.get(25);
//
//     var votes = PollCatApp.votes.where({ poll_id: samplePoll.id });
//
//     var vote_freq = {};
//     for(var i = 0; i < votes.length; i++) {
//       var vote = parseInt(votes[i].attributes["msg"]);
//       if(typeof vote_freq[vote] != 'undefined')
//         vote_freq[vote]++;
//       else
//         vote_freq[vote] = 1;
//     }
//     var showSample = Backbone.Model.extend({urlRoot : '/polls'});
//
//     showSample = new PollCatApp.Views.PollShow( { model: samplePoll,
//                                                   collection: PollCatApp.votes,
//                                                   voteFreq: vote_freq,
//                                                   id: samplePoll.id });
//
//    this.$rootEl.html(showSample.render().$el);
//   }
})