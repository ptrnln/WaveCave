class Api::TracksController < ApplicationController
    # prepend_before_action :require_logged_in_as_owner, only: :require_logged_in
    before_action :require_logged_in_as_owner, only: [ :update, :destroy ]
    before_action :require_logged_in, only: [ :create ]

# ---------------------- Backend Routes ------------------------

    def index
        @tracks = Track.all
        if @tracks
            render :index
        else
            render nothing: true, status: :not_found
        end
    end

    def create
        @track = Track.new(track_params)

        if @track.save 
            render :show
        else
            render json: { errors: @track.errors.full_messages }, 
                status: :unprocessable_entity
        end
    end

    def show
        @track = Track.find_by(title: params[:title].gsub!('-', ' '))
        @user = User.find_by(username: params[:username]);
        debugger

        if @track && @track.artist_id == @user.id
            render :show
        else
            render json: { message: 'Could not find this track' }, status: :not_found
        end
    end

    def update
        @track = Track.find(params[:id])
        
        if @track.update(track_params)
            render :show
        else
            render json: { errors: @track.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        Track.destroy(params[:id])
        redirect_to controller: 'user', action: 'show'
    end

# -------------- Track-specific helper methods ------------------

    def require_logged_in_as_owner
        @track = Track.find(params[:id])

        unless current_user && @track[:artist_id] == current_user.id
            render json: { message: 'You are not the owner of this track' }, status: :unauthorized
        end
    end

    private

    def track_params
        params.require(:track).permit(
            :id,
            :artist_id, 
            :title, 
            :description, 
            :source_url, 
            :image_url, 
            :file_type, 
            :duration
            )
    end
end
