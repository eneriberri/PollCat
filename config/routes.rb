PollCatApp::Application.routes.draw do
  resources :users, :only => [:new, :create, :show] do
    resources :polls, :only => [:index, :create, :new]
  end
  resources :polls, :except => [:index, :create, :new]

  resource :session, :only => [:new, :create, :destroy]
end
