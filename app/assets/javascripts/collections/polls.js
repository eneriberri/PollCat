PollCatApp.Collections.Polls = Backbone.Collection.extend({
  model: PollCatApp.Models.Polls,
  url: '/polls' // function() {
//     return '/users/' + this.user.id + '/polls'
//   },

  // initialize: function(options) {
  //   this.user: option.user
  // }
})