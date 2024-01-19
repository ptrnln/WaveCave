json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
    json.tracks do
        i = 1
        @user.tracks.each do |track|
            json.set! i do
                json.extract! track,
                    :id,
                    :title,
                    :description,
                    :genre
            end
            i += 1
        end
    end
end