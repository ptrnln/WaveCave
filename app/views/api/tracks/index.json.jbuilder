idx = 1
json.tracks do
    @tracks.each do |track|
        json.set! idx do
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
        idx += 1
    end 
end