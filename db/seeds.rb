# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
SEED_TRACKS_LIST = {
  1 => {
    :title => 'CBAT',
    :description => 'It just has a really good rhythm',
    :genre => 'Stroke-core',
    :file_type => 'mp3',
    :source_url => "https://wavecave-dev.s3.amazonaws.com/9w2zx8vw2uiaik68qmotetmy1bbz?response-content-disposition=attachment%3B%20filename%3D%22Hudson%20Mohawke%20-%20Cbat.mp3%22%3B%20filename%2A%3DUTF-8%27%27Hudson%2520Mohawke%2520-%2520Cbat.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3FLDY2WJPS64GCG5%2F20240124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240124T204102Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=870adbbe1171c0f1dbb752596e430096888a853a8db05b27e4401ee3eadcad93"
  },
  # 2: {
  #   title: "Spider-Man: The Animated Series (SEGA Genesis) - Fun House",
  #   description: "Best song ever maybe?",
  #   genre: 'Clown-core',
  #   file_type: 'mp3',
  #   source_url: 
  # }
}
require "open-uri"
# ApplicationRecord.transaction do 
    puts "Destroying ActiveStorage associations..."

    User.all.each do |user|
      user.photo.purge
    end
    
    Track.all.each do |track|
      track.photo.purge
      track.source.purge
    end

    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Track.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('tracks')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts('Creating tracks...')

    t = Track.new({
      :title => SEED_TRACKS_LIST[1][:title],
      :description => SEED_TRACKS_LIST[1][:description],
      :artist_id => Random.new().rand(1..11),
      :genre => SEED_TRACKS_LIST[1][:genre],
      :file_type => SEED_TRACKS_LIST[1][:file_type]
    })
    t.source.attach(SEED_TRACKS_LIST[1][:source_url])
    t.save!

    10.times do
      t = Track.new({
        title: Faker::Music::PearlJam.unique.song,
        artist_id: Random.new().rand(1..11),
        file_type: 'mp3',
        duration: [69, 420].sample
      })
      t.photo.purge
      t.photo.attach(io: URI.open("https://wavecave-seeds.s3.amazonaws.com/Screenshot+2024-01-19+153436.png"), filename: "Screenshot+2024-01-19+153436.png" ) if i == 0 
      t.save!
    end
  
    puts "Done!"
# end
  
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
