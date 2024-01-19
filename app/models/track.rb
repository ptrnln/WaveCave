# == Schema Information
#
# Table name: tracks
#
#  id          :bigint           not null, primary key
#  artist_id   :bigint           not null
#  title       :string           not null
#  description :text
#  source_url  :string           not null
#  image_url   :string
#  file_type   :string           not null
#  duration    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  genre       :string
#
class Track < ApplicationRecord

    validates :artist_id, :title, :source_url, :duration, presence: true
    validates :file_type, inclusion: { in: %w(wav mp3) }

    belongs_to :artist, class_name: "User", foreign_key: "artist_id"

    has_one_attached :photo
end
