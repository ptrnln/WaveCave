

class Playlist < ApplicationRecord
    validates :publisher_id, :title, presence: true
end