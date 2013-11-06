PollCatApp::Application.routes.draw do
  resources :users, :only => [:new, :create, :show]
  resources :polls
  resources :answers, :only => [:index, :show]

  resource :session, :only => [:new, :create, :destroy]

  root :to => "StaticPages#index"
end
