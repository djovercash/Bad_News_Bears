class CreateIdeas < ActiveRecord::Migration[5.1]
  def change
    create_table :ideas do |t|
      t.string :description
      t.references :user
      t.integer :do_it, default: 0
      t.integer :dont_do_it, default: 0
      t.text :outcome, default: " "
      t.boolean :good, default: false
      t.string :url, default: " "

      t.timestamps
    end
  end
end
