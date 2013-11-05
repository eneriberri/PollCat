class Poll < ActiveRecord::Base
  attr_accessible :question, :poll_type, :open, :user_id

  validates :question, :poll_type, :open, :user_id, :presence => true

  belongs_to :user
  has_many :answers
end
