class AddPollIDtoVotes < ActiveRecord::Migration
  def change
    add_column :votes, :poll_id, :integer
    add_index :votes, :poll_id
  end
end
