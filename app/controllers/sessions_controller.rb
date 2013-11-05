class SessionsController < ApplicationController
  before_filter :require_current_user, :only => [:destroy]

  def new

  end

  def create
    @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
            )

    if @user
      session[:session_token] = @user.session_token
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