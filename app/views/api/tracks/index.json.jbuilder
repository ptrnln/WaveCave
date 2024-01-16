json.tracks do
    json.array! @tracks.each do |track|
        json.extract! track, 
            :id, 
            :artist_id, 
            :title, 
            :description, 
            :genre, 
            :source_url, 
            :image_url, 
            :file_type, 
            :duration, 
            :created_at,
            :updated_at
    end 
end