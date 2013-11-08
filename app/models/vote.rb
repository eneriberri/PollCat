class Vote < ActiveRecord::Base
  attr_accessible :msg, :from
  validates :msg, :from, :presence => true
end
