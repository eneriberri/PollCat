PollCatApp.Views.PollIndex = Backbone.View.extend({
  template: JST['polls/index'],

  render: function() {
    var renderedHTML = this.template({ polls: this.collection });
    this.$el.html(renderedHTML);
    return this;
  }
})