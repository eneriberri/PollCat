class Vote < ActiveRecord::Base
  attr_accessible :msg, :from, :poll_id
  validates :msg, :from, :poll_id, :presence => true
end
