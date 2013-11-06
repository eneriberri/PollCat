PollCatApp.Routers.PollRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options['$rootEl'];
  },

  routes: {
    "": "index"
  },

  index: function() {
    var indexView = new PollCatApp.Views.PollIndex({collection: PollCatApp.polls});
    this.$rootEl.html(indexView.render().$el);
  }
})