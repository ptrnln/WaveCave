
json.tracks do
    @tracks.each do |track|
        json.set! track.id do
        json.extract! track,
            :id, 
            json.merge! :artist.attributes.except("password_digest", "session_token") do 
                json.extract! :artist do
                    :id, 
                    :email, 
                    :username, 
                    :created_at, 
                    :updated_at
                end
            end
            :title, 
            :description, 
            :genre, 
            :file_type, 
            :duration, 
            :created_at,
            :updated_at;
            json.photoUrl track.photo.attached? ? track.photo.url : nil
            json.sourceUrl track.source.url
            json.sourceName track.source.filename 
        end
    end 
end