json.users do
    i = 1
    @users.each do |user|
        json.set! i do
            json.extract! user,
                :id, 
                :email, 
                :username, 
                :created_at, 
                :updated_at
        end
        i += 1
    end
end