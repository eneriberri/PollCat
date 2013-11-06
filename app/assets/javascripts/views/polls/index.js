PollCatApp.Views.PollIndex = Backbone.View.extend({
  template: JST['polls/index'],

  render: function() {
    var renderedHTML = this.template({ poll: this.model });
    this.$el.html(renderedHTML);
    return this;
  }
})