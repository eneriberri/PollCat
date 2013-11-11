PollCatApp.Views.PollEdit = Backbone.View.extend({
  template: JST['polls/edit'],

  render: function() {
    alert("in render of editpoll view");
    var renderedHTML = this.template({ poll: this.model });
    this.$el.html(renderedHTML);

    renderChart();
    return this;
  },

  renderChart: function() {
    var votes = this.collection.where({ poll_id: parseInt(this.id) });
    if(_.keys(this.voteFreq).length === 0) {
      var ctxInitial = this.$el.find('#myChart').get(0).getContext("2d");
      new Chart(ctxInitial).Pie([{ value: 1, color: "#000000" }]);
    }
    else {
      var pieData = [];
      var len = _.keys(this.voteFreq).length;
      for(var i = 0; i < len; i++) {
        pieData.push({ value: this.voteFreq[i+1], color: PollCatApp.COLORS[i] });
      }
      var ctx = this.$el.find('#myChart').get(0).getContext("2d");
      new Chart(ctx).Pie(pieData);
    }
  }
})