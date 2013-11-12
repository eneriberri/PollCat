class AnswersController < ApplicationController
  def index
    @answers = Answer.all
    render :json => @answers
  end

  def show
    @answer = Answer.find(params[:id])
    render :json => @answer
  end

  def update
    @answer = Answer.find(params[:id])

    if @answer.update_attributes(params[:answer])
      render :json => @answer
    else
      render :json => @answer.errors.full_messages
    end
  end

end
