class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.string :question, :null => false
      t.string :poll_type, :null => false
      t.boolean :open, :null => false, :default => true
      t.integer :user_id, :null => false

      t.timestamps
    end

    add_index :polls, :question
    add_index :polls, :user_id
    add_index :polls, :open

  end
end
