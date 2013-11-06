PollCatApp.Routers.PollRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options['$rootEl'];
  },

  routes: {
    "": "index"
  },

  index: function() {
    console.log("im in index");
    var indexView = new PollCatApp.Views.PollIndex({collection: collection})
    this.$rootEl.html(indexView.render().$el);
  }
})