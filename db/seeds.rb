# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

const SEED_TRACKS_LIST = {
  1: {
    title: 'CBAT',
    description: 'It just has a really good rhythm',
    genre: 'Stroke-core'
    file_type: 'mp3',
    source_url: 
  },
  2: {
    title: "Spider-Man: The Animated Series (SEGA Genesis) - Fun House",
    description: "Best song ever maybe?",
    genre: 'Clown-core',
    file_type: 'mp3',
    source_url: 
  }
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

    i = 0
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
      i += 1;
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
