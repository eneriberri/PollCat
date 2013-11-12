PollCatApp.Views.PollShow = Backbone.View.extend({
  template: JST['polls/show'],

  initialize: function(options) {
    this.textCode = options.textCode;
    this.voteFreq = options.voteFreq;
  },

  events: {
    "click .edit": "editPoll",
    "click .save": "savePoll"
  },

  render: function() {
    var renderedHTML = this.template({ poll: this.model,
                                       votes: this.collection,
                                       textCode: this.textCode });
    this.$el.html(renderedHTML);
    //draws initial chart and on refresh
    this.renderChart();

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
  },

  editPoll: function(event) {
    this.editQues();
    this.editAnswers();

    var $btn = $(".edit");
    $btn.text("Save Poll");
    $btn.removeClass('edit').addClass('success save');
  },

  editQues: function() {
    var currentQues = $("#poll-ques").text();

    if(currentQues.length >= 18) {
      currentQues = currentQues.substring(0, 14) + "...";
    }

    var input = "<input name='poll[question]' id='poll-ques' placeholder='"
                + currentQues + "' class='poll-edit-ques'></input>";

    $("#poll-ques").replaceWith(input);
    $("#poll-ques").focus();
  },

  editAnswers: function() {
    $('#answers').children().each(function(index, answer) {
      if(index % 2 !== 0) {
        var currentAnswer = $(answer).text();
        //substract 2 to get rid of space and period before Text Code
        var textCodeIndex = currentAnswer.lastIndexOf("Text Code:") - 2;
        currentAnswer = currentAnswer.slice(0, textCodeIndex);
        console.log(currentAnswer.slice(0, textCodeIndex));
        var input = "<input name='answer[body]' placeholder='"
                    + currentAnswer + "' class='poll-edit-answer'></input>";
        $(answer).replaceWith(input);
     }
    });
  },

  savePoll: function(event) {
    var $btn = $(".save");
    $btn.text("Edit Poll");
    $btn.removeClass('success save').addClass('edit');

    var currentQues = $("#poll-ques").val();
    var input = "<h1 id='poll-ques'>" + currentQues + "</h1>";
    $("#poll-ques").replaceWith(input);

    this.model.save({question: currentQues}, {
      success: function() {
        console.log('success');
      },
      error: function() {
        console.log('error');
      }
    });
  }

})