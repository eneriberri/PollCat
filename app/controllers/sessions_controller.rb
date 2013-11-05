class SessionsController < ApplicationController
  before_filter :require_current_user, :only => [:destroy]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
            )

    if @user
      login(@user)
      redirect_to user_url(@user.id)
    else
      render :json => "Credentials were wrong."
    end
  end

  def destroy
    logout_current_user!
    redirect_to new_session_url
  end

end