class PollsController < ApplicationController
  before_filter :require_current_user, :only => [:edit, :update, :destroy]

  def new
    if current_user.nil?
      login(User.find(1))
    end

    render :new
  end

  def create
    @poll = Poll.new(params[:poll])
    @poll.answers.new(params[:answers].values)
    if @poll.save
      #render :json => @poll
      redirect_to "#/polls/#{@poll.id}"
    else
      render :json => @poll.errors.full_messages
    end
  end

  def destroy
    @poll = Poll.find(params[:id])
    @poll.destroy
    redirect_to polls_url
  end

  def show
    @poll = Poll.find(params[:id])
    @message_body = params["Body"]

    render :json => @poll.to_json(:include => :answers)
  end

  def index
    render :json => Poll.includes(:answers).all, :include => :answers
  end

  def edit
    render :edit
  end

  def update
    @poll = Poll.find(params[:id])

    if @poll.update_attributes(params[:poll])
      render :json => @poll.to_json(:include => :answers)
    else
      render :json => @poll.errors.full_messages
    end
  end
end
