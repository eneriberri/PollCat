class VotesController < ApplicationController
  def index
    @votes = Vote.all
    render :json => @votes
  end

  def receive_txt
    msg = params["Body"]
    from_number = params["From"]
    Vote.create({msg: msg, from: from_number})

    Pusher['vote_channel'].trigger('new_vote', {
      message: msg
    })

    render :json => "success!"
  end
end
