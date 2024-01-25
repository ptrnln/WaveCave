# == Schema Information
#
# Table name: tracks
#
#  id          :bigint           not null, primary key
#  artist_id   :bigint           not null
#  title       :string           not null
#  description :text
#  file_type   :string           not null
#  duration    :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  genre       :string
#
class Track < ApplicationRecord

    validates :artist_id, :title, :duration, presence: true
    validates :file_type, inclusion: { in: %w(wav mp3 flac) }

    belongs_to :artist, class_name: "User", foreign_key: "artist_id"

    has_one_attached :photo
    has_one_attached :source

    validate :source_presence
    validate :name_unique_on_artist

    private

    def source_presence
        return true if self.source.attached?
        self.errors.add(:source_file, "must be attached");
        return false
    end

    def name_unique_on_artist
        return true if self.artist.tracks.none?{ |track| track.title == self.title }
        self.errors.add(:title, "cannot be used more than once by the same artist")
        return false
    end
end
