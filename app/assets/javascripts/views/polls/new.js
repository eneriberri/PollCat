PollCatApp.Views.PollNew = Backbone.View.extend({
  template: JST['polls/new'],

  render: function() {
    this.$el.html(this.template);
    return this;
  }
})