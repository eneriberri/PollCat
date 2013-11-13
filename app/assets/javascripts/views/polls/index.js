PollCatApp.Views.PollIndex = Backbone.View.extend({
  template: JST['polls/index'],
  //
  // events: {
  //   "click #root-create-poll": "createGuestPoll"
  // },

  render: function() {
    var renderedHTML = this.template({ polls: this.collection });
    this.$el.html(renderedHTML);
    return this;
  },

  createGuestPoll: function(event) {
    // event.preventDefault();
    //
    // var guest = new PollCatApp.Models.User({
    //   username: "Guest",
    //   password: "guest123"
    // });
    //
    // guest.save();


    //create guest user
    //log guest user in
    //
  }
})