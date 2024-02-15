class Api::PlaylistsController < ApplicationController

    def index 
        @playlists = Playlist.all

        render :index
    end

    def show
        @playlist = Playlist.find(params[:id]);
        
        render :show
    end

    def create
        @playlist = Playlist.new(playlist_params)

        if @playlist.save
            
        else

        end
    end

    private

    def playlist_params
        params.require(:playlist).permit(:publisher_id, :title, :description)
    end

end
