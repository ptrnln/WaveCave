json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
    json.tracks do
        @user.tracks.each do |track|
            json.set! track.id do
                json.extract! track,
                    :id,
                    :title,
                    :artist,
                    :description,
                    :genre
                json.photo_url track.photo.url if track.photo.attached? 
            end
        end
    end
end