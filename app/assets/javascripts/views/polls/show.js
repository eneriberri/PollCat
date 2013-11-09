PollCatApp.Views.PollShow = Backbone.View.extend({
  template: JST['polls/show'],

  initialize: function(options) {
    this.textCode = options.textCode;
    this.voteFreq = options.voteFreq;
  },

  render: function() {

    var renderedHTML = this.template({ poll: this.model,
                                       votes: this.collection,
                                       textCode: this.textCode });
    this.$el.html(renderedHTML);

    this.renderChart();
    return this;
  },

  renderChart: function() {
    console.log("vote freq");
    console.log(this.voteFreq);

    var pieData = [];
    var colors = ["#F38630", "#E0E4CC", "#69D2E7"];

    var len = _.keys(this.voteFreq).length;
    for(var i = 0; i < len; i++) {
      pieData.push({ value: this.voteFreq[i+1], color: colors[i] });
    }

    var ctx = this.$el.find('#myChart').get(0).getContext("2d");
    new Chart(ctx).Pie(pieData);
  }


})