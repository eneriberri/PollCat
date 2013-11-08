PollCatApp::Application.routes.draw do
  resources :users, :only => [:new, :create, :show]
  resources :polls
  resources :answers, :only => [:index, :show]

  resource :session, :only => [:new, :create, :destroy]

  resources :votes, :only => [:index]

  get '/makecall', to: 'polls#makecall'
  post '/makecall', to: 'polls#makecall'

  get '/sendtxt', to: 'polls#send_text_message'
  post '/sendtxt', to: 'polls#send_text_message'

  #configuration under twilio
  get '/sms', to: 'votes#receive_txt'
  post '/sms', to: 'votes#receive_txt'

  root :to => "StaticPages#index"
end
