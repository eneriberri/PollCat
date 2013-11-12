class Answer < ActiveRecord::Base
  attr_accessible :body, :poll_id, :count

  validates :body, :presence => true

  belongs_to :poll
end
