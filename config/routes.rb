Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  get "/api/users/:username/tracks/:title" => "api/tracks#show", title: /[^\/]+/, defaults: { format: :json }
  get "/api/users/:username" => "api/users#show", username: /[^\/]+/, defaults: { format: :json }
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create]
    resource :session, only: [:show, :create, :destroy]
    resources :tracks, only: [:index, :show, :create, :update, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"
end
