class SessionsController < ApplicationController

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
            )

    if @user.nil?
      render :json => "Credentials were wrong."
    else
      login(@user)
      redirect_to user_url(@user.id)
    end
  end

  def destroy
    logout_current_user!
    redirect_to new_session_url
  end

end