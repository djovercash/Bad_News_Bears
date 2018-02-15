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


Idea.create(description: "Not wiping your bottom", user_id: 0, do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Licking a frozen pole", user_id: 1, do_it: Random.new.rand(1..100), dont_do_it:Random.new.rand(1..100) )
Idea.create(description: "Staying inside during a fire alarm" , user_id: 2, do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Get back with my ex", user_id: 3, do_it: Random.new.rand(1..100), dont_do_it:Random.new.rand(1..100) )
Idea.create(description: "Buying diet water", user_id: 4, do_it: Random.new.rand(1..100), dont_do_it:Random.new.rand(1..100) )
Idea.create(description: "Drinking coffee before bed", user_id: 5, do_it: Random.new.rand(1..100), dont_do_it:Random.new.rand(1..100) )
Idea.create(description: "Stealing an eraser", user_id:6 , do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Stealing candy from a baby", user_id: 7, do_it:Random.new.rand(1..100) , dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Telling your best friend's partner how you really feel about them", user_id: 8, do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Asking someone if they are pregnant", user_id:9 , do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Borrowing someone's underwear", user_id:0 , do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Trying to make a yellow light", user_id: 1, do_it: Random.new.rand(1..100), dont_do_it:Random.new.rand(1..100) )
Idea.create(description: "Eating the last piece of cake", user_id: 2, do_it:Random.new.rand(1..100) , dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Going for the king size", user_id: 3, do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Do you want to supersize that? Yes", user_id: 4, do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Breaking up with the perfect person", user_id: 5, do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Drunk TacoBell", user_id: 6, do_it: Random.new.rand(1..100), dont_do_it:Random.new.rand(1..100) )
Idea.create(description: "Getting the flatiron tattoo", user_id: 7, do_it: Random.new.rand(1..100), dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Bringing crunchy things to eat in a movie theatre", user_id: 8, do_it: Random.new.rand(1..100), dont_do_it:Random.new.rand(1..100) )
Idea.create(description: "Making fetch happen", user_id: 9, do_it:Random.new.rand(1..100) , dont_do_it: Random.new.rand(1..100))
Idea.create(description: "Eating raw chicken", user_id: 9, do_it:Random.new.rand(1..100) , dont_do_it: Random.new.rand(1..100))
