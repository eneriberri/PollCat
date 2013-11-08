PollCatApp.Views.PollShow = Backbone.View.extend({
  template: JST['polls/show'],

  render: function() {
    console.log(this.collection);
    var renderedHTML = this.template({ poll: this.model, votes: this.collection });
    this.$el.html(renderedHTML);
    return this;
  }
})