class VotesController < ApplicationController
  def index
    @votes = Vote.all
    render :json => @votes
  end

  def receive_txt
    msg = params["Body"]
    from_number = params["From"]
    puts "before create"
    Vote.create({msg: msg, from: from_number})
  end
end
