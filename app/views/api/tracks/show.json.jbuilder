json.track do
    json.extract! @track, 
        :id, 
        :artist_id, 
        :title, 
        :description, 
        :genre, 
        :file_type, 
        :duration, 
        :created_at,
        :updated_at;
        json.photoUrl @track.photo.attached? ? @track.photo.url : nil
end