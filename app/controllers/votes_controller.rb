class VotesController < ApplicationController
  def index
    @votes = Vote.all
    render :json => @votes
  end

  def receive_txt
    msg = params["Body"][0]
    poll_id = params["Body"][1..-1]
    from_number = params["From"]
    Vote.create({msg: msg, from: from_number, poll_id: poll_id})

    Pusher['vote_channel'].trigger('new_vote', {
      message: msg
    })

    render :json => "success!"
  end
end
