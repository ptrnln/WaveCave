json.track do
    json.set! @track.id do
        json.extract! @track, 
        :id, 
        :title, 
        :description, 
        :genre, 
        :file_type, 
        :duration, 
        :created_at,
        :updated_at;
        json.photoUrl @track.photo.attached? ? @track.photo.url : ''
        json.sourceUrl @track.source.url
        json.sourceName @track.source.filename
        json.partial! 'api/users/artist', user: track.artist
    end
end