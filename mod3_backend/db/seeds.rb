# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


joseph = User.create(username: "Joseph")
john = User.create(username: "John")
anna = User.create(username: "Anna")
drew = User.create(username: "Drew")
kevin = User.create(username: "Kevin")
mo = User.create(username: "Mo")
oleg = User.create(username: "Oleg")
mark = User.create(username: "Mark")
briana = User.create(username: "Briana")
julien = User.create(username: "Julien")

10.times do |i|
  Idea.create(description: "Idea #{i}", user_id: Random.new.rand(1..10))
end
