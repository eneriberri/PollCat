class UsersController < ApplicationController
  before_filter :require_current_user, :only => [:show]

  def new
    render :new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      login(@user)
      redirect_to user_url(@user.id)
    else
      render :json => @user.errors.full_messages
    end
  end

  def show
    @user = User.find(params[:id])

    render :show
  end

  def index
    render :json => User.includes(:polls).all, :include => :polls
  end
end
