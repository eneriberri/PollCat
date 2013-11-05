class Answer < ActiveRecord::Base
  attr_accessible :body, :user_id, :poll_id, :count

  validates :body, :user_id, :poll_id, :count, :presence => true

  belongs_to :user
  belongs_to :poll
end
