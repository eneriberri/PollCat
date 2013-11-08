PollCatApp.Views.VoteIndex = Backbone.View.extend({
  template: JST['votes/index'],

  render: function() {
    console.log(this.collection);
    var renderedHTML = this.template({ votes: this.collection });
    this.$el.html(renderedHTML);
    return this;
  }
})