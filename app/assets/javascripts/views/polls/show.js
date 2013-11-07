PollCatApp.Views.PollShow = Backbone.View.extend({
  template: JST['polls/show'],

  render: function() {
    var renderedHTML = this.template({ poll: this.model });
    this.$el.html(renderedHTML);
    return this;
  }
})