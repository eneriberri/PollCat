PollCatApp::Application.routes.draw do
  resources :users, :only => [:new, :create, :show]
  resources :polls
  resources :answers, :only => [:index, :show]

  resource :session, :only => [:new, :create, :destroy]
  get '/makecall', to: 'polls#makecall'
  post '/makecall', to: 'polls#makecall'

  get '/sendtxt', to: 'polls#send_text_message'
  post '/sendtxt', to: 'polls#send_text_message'

  root :to => "StaticPages#index"
end
