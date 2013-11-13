PollCatApp.Views.PollShow = Backbone.View.extend({
  template: JST['polls/show'],

  initialize: function(options) {
    this.voteFreq = options.voteFreq;
  },

  events: {
    "click .edit": "editPoll",
    "click .save": "savePoll",
    "click .hidden-delete": "deletePoll",
    "click .disabled": "disabledToolTip"
  },

  render: function() {
    var renderedHTML = this.template({ poll: this.model,
                                       votes: this.collection,
                                       textCode: 0 });

    this.$el.html(renderedHTML);
    this.toggleAuthorButtons();
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
      var len = this.model.get('answers').length;
      for(var i = 0; i < len; i++) {
        var freq = typeof this.voteFreq[i+1] !== 'undefined' ? this.voteFreq[i+1] : 0;
        pieData.push({ value: freq, color: PollCatApp.COLORS[i] });
      }
      var ctx = this.$el.find('#myChart').get(0).getContext("2d");
      new Chart(ctx).Pie(pieData);
    }
  },

  editPoll: function(event) {
    if(event.target.className.indexOf('disabled') === -1) {
      this.editQues();
      this.editAnswers();

      var $btn = $(".edit");
      $btn.text("Save Poll");
      $btn.removeClass('edit').addClass('success save');
    }
  },

  editQues: function() {
    var currentQues = $("#poll-ques").text();

    if(currentQues.length >= 18) {
      currentQues = currentQues.substring(0, 14) + "...";
    }

    var input = "<input name='poll[question]' id='poll-ques' placeholder='"
                + currentQues + "' class='poll-edit-ques'></input>";
    $("#poll-ques").replaceWith(input);

    //tool tip display on hover
    var msg = "<span data-tooltip class='has-tip ques-tip'" +
              "title='Edit poll question here.'></span>"
    $("#poll-ques").wrap(msg);

    $("#poll-ques").focus();
  },

  editAnswers: function() {

    $('#answers').children().each(function(index, answer) {
      if(index % 2 !== 0) { //skips the color square element in the <ul>
        var currentAnswer = $(answer).text();
        var msg = "<span data-tooltip class='has-tip tip-right answer-tip'" +
                  "title='Edit answer choice here.'></span>"
        $(answer).wrap(msg);

        var textCodeIndex = currentAnswer.lastIndexOf("Text Code:");

        //substract 2 to get rid of space and period before Text Code
        currentAnswer = currentAnswer.slice(0, textCodeIndex - 2);
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
    $('#poll-ques').unwrap(); //remove edit question tooltip

    var currentQues = $("#poll-ques").val();
    var input = "<h1 id='poll-ques'>" + currentQues + "</h1>";
    $("#poll-ques").replaceWith(input);

    this.populateAnswers();
    this.saveAnswers();

    this.model.save({question: currentQues}, {
      error: function() {
        console.log('error');
      }
    });
  },

  populateAnswers: function() {
    var that = this;
    var textCode = 1;
    var answerId = 1;
    $('#answers').children().each(function(index, answer) {
      if(index % 2 !== 0) { //tooltip wraps around answer choice, so must find its child
        var currentAnswer = $('.answer-tip').children().first().val();
        console.log(currentAnswer);
        var input = "<h3 id=" + answerId + ">" + currentAnswer + ". <small>Text Code: "
                    + textCode + "" + that.model.id + "</small></h3>";
        $(answer).replaceWith(input);
        textCode++;
        answerId++;
     }
    });
  },

  saveAnswers: function() {
    var answerId = 1;
    this.model.get("answers").each(function(answer) {
      var answerEl = "#" + answerId;
      var textCodeIndex = $(answerEl).text().lastIndexOf("Text Code");
      var answerBody = $(answerEl).text().slice(0, textCodeIndex - 2);
      answerId++;
      answer.save({body: answerBody}, {});
    });
  },

  deletePoll: function() {
    this.model.destroy();
    Backbone.history.navigate('/', {trigger: true});
  },

  toggleAuthorButtons: function() {
    if(currentUser.id === undefined || this.model.get("user_id") !== currentUser.id) {
      _(function(){
        $('.edit').addClass('disabled greyed');
        $('.initial-delete').addClass('disabled greyed');
      }).defer();
    }
    else {
      _(function(){
        $('.initial-delete').attr('data-reveal-id', 'deleteModal');
      }).defer();
    }
  },

  disabledToolTip: function(event) {
    var msg = "<span data-tooltip class='has-tip'" +
              "title='Action enabled only for poll author. Sorry :3'></span>"
    $(event.target).wrap(msg);
  }

})