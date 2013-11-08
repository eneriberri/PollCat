class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.string :msg
      t.string :from

      t.timestamps
    end
  end
end
