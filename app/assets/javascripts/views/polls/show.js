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
    var votes = this.collection.where({ poll_id: parseInt(this.id) });
    console.log(this.voteFreq);

    // var vote_freq = {};
    // for(var i = 0; i < votes.length; i++) {
    //   var vote = parseInt(votes[i].attributes["msg"]);
    //   if(typeof vote_freq[vote] != 'undefined') //if(vote_freq[vote] >= 0)
    //     vote_freq[vote]++;
    //   else
    //     vote_freq[vote] = 0;
    // }
    //
    // console.log("vote freq");
    // console.log(vote_freq);

    var pieData = [];
    var colors = ["#F38630", "#E0E4CC", "#69D2E7"];

    var len = _.keys(this.voteFreq).length;
    for(var i = 0; i < len; i++) {
      pieData.push({ value: this.voteFreq[i+1], color: colors[i] });
    }

    console.log("pie data from view");
    console.log(pieData);

    var ctx = this.$el.find('#myChart').get(0).getContext("2d");
    new Chart(ctx).Pie(pieData);
  }


})