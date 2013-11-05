module SessionsHelper
  def current_user
    User.find_by_session_token(session[:session_token])
  end

  def logout_current_user!
    current_user.session_token = current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_current_user
    redirect_to new_session_url unless current_user
  end
end
