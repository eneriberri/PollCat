class PollsController < ApplicationController
  before_filter :require_current_user, :only => [:edit, :update, :destroy]

  def new
    render :new
  end

  def create
    @poll = Poll.new(params[:poll])
    if @poll.save
      redirect_to new_user_poll_url(params[:user_id])
    else
      render :json => @poll.errors.full_messages
    end
  end

  def destroy
    @poll = Poll.find(params[:id])
    @poll.destroy
    redirect_to user_polls_url(current_user)
  end

  def show
    @poll = Poll.find(params[:id])
    @answer_choices = Answer.where('poll_id = @poll.id')

    render poll_url(@poll)
  end

  def index
    render :index
  end

  def edit
    render :edit
  end

  def update
    @poll = Poll.find(params[:id])

    if @poll.update_attributes(params[:poll])
      redirect_to poll_url(@poll)
    else
      render :json => @poll.errors.full_messages
    end
  end
end
