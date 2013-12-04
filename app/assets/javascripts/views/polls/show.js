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
    var ctx = this.$el.find('#myChart').get(0).getContext("2d");
    this.myPie = new Chart(ctx)
    this.renderChart();

    return this;
  },

  renderChart: function() {
    var votes = this.collection.where({ poll_id: parseInt(this.id) });
    if(_.keys(this.voteFreq).length === 0) {
      var ctxInitial = this.$el.find('#myChart').get(0).getContext("2d");
      new Chart(ctxInitial).Pie([{ value: 1, color: "#000000" }], 
	  							{ animationEasing : "easeOutQuart" });
    }
    else {
      var pieData = [];
      var len = this.model.get('answers').length;
      for(var i = 0; i < len; i++) {
        var freq = typeof this.voteFreq[i+1] !== 'undefined' ? this.voteFreq[i+1] : 0;
        pieData.push({ value: freq, color: PollCatApp.COLORS[i] });
      }
      this.myPie.Pie(pieData, { animationEasing : "easeOutQuart" });
    }
  },

  editPoll: function(event) {
    event.preventDefault();
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
              "title='Type here to edit poll question.'></span>"
    $("#poll-ques").wrap(msg);
    $("#poll-ques").trigger("mouseover"); //trigger tooltip

    $("#poll-ques").focus();
  },

  editAnswers: function() {
    var triggerOnce = true;
    var that = this;
    $('#answers').children().each(function(index, answer) {
      if(index % 2 !== 0) { //skips the color square element in the <ul>
        var currentAnswer = $(answer).text();
        var msg = "<span data-tooltip class='has-tip tip-top answer-tip'" +
                  "title='Type here to edit answer choice.'></span>"
        $(answer).wrap(msg);
        //trigger tooltip once for 2 seconds
        if(triggerOnce) {
          $(answer).trigger("mouseover");
          setTimeout( function() { $(".answer-tip").trigger("mouseleave") } , 1600);
          triggerOnce = false;
        }

        var textCodeIndex = currentAnswer.lastIndexOf("Text Code:");

        //substract 2 to get rid of space and period before Text Code
        currentAnswer = currentAnswer.slice(0, textCodeIndex - 2);
        currentAnswer = that.answerTrim(currentAnswer);
        var input = "<input name='answer[body]' placeholder='"
                    + currentAnswer + "' class='poll-edit-answer'></input>";

        $(answer).replaceWith(input);
     }
    });
  },

  //removes leading and trailing whitespace from answer
  answerTrim: function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },

  savePoll: function(event) {
    event.preventDefault();
    var $btn = $(".save");
    $btn.text("Edit Poll");
    $btn.removeClass('success save').addClass('edit');
    $('#poll-ques').trigger('mouseleave');
    $('#poll-ques').unwrap(); //remove edit question tooltip

    var currentQues = $("#poll-ques").val();
    if (!currentQues) { //fill with prior value if no input
      currentQues = this.model.get("question");
    }
    var input = "<h1 id='poll-ques'>" + currentQues + "</h1>";
    $("#poll-ques").replaceWith(input);

    this.populateAnswers();
    this.saveAnswers();

    this.model.save({question: currentQues}, {});
  },

  populateAnswers: function() {
    var that = this;
    var textCode = 1;
    var answerId = 1;
    $('#answers').children().each(function(index, answer) {
      if(index % 2 !== 0) { //tooltip wraps around answer choice, so must find its child
        var currentAnswer = $('.answer-tip').children().first().val();
        if(!currentAnswer) { //if user left blank, fill with prior val
          currentAnswer = $('.answer-tip').children().first().attr('placeholder');
        }
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

  deletePoll: function(event) {
    event.preventDefault();
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
    event.preventDefault();
    var msg = "<span data-tooltip class='has-tip'" +
              "title='Action enabled only for poll author. Sorry :3'></span>"
    $(event.target).wrap(msg);
  }

})