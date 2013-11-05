class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :body, :null => false
      t.integer :poll_id, :null => false
      t.integer :user_id, :null => false
      t.integer :count, :null => false, :default => 0

      t.timestamps
    end

    add_index :answers, :poll_id
    add_index :answers, :user_id

  end
end
