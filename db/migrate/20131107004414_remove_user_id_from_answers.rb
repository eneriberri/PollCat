class RemoveUserIdFromAnswers < ActiveRecord::Migration
  def change
    remove_column :answers, :user_id
  end
end
