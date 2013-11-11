PollCatApp.Views.PollEdit = Backbone.View.extend({
  template: JST['polls/edit'],

  render: function() {
    alert("in render of editpoll view");
    var renderedHTML = this.template({ poll: this.model });
    this.$el.html(renderedHTML);
    return this;
  }
})