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
    votes = Vote.where("poll_id = ?", poll_id)
    votes.map! { |vote| vote.msg }

    vote_freq = Hash.new(0)
    votes.each { |vote| vote_freq[vote] += 1 }

    Pusher['vote_channel'].trigger('new_vote', {
      message: msg,
      poll_id: poll_id,
      votes: vote_freq
    })

    send_txt(from_number)

    render :json => "success!"
  end

  def send_txt(from_number)
    number_to_send_to = from_number

    twilio_sid = ACCOUNT_SID
    twilio_token = ACCOUNT_TOKEN
    twilio_phone_number = TWILIO_PHONE

    @twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token

    @twilio_client.account.sms.messages.create(
      :from => "+1#{twilio_phone_number}",
      :to => number_to_send_to,
      :body => "Howdy! Thanks for voting. -Poll Cat :3"
    )
    render :json => "success!"

  end
end
