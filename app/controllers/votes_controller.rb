class VotesController < ApplicationController
  def index
    @votes = Vote.all
    render :json => @votes
  end

  def receive_txt
    msg = params["Body"][0]
    poll_id = params["Body"][1..-1]
    from_number = params["From"]

    if txt_valid?(msg, poll_id)
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
      success_txt = "Howdy! Thanks for voting. -Poll Cat :3"
      send_txt(from_number, success_txt)
    else
      error_txt = "Hey, butterfingers. That wasn't a valid text code. Try again. -Poll Cat :3"
      send_txt(from_number, error_txt)
    end
      render :json => "text received!"
  end

  def txt_valid?(msg, poll_id)
    poll_ids = Poll.all.map { |poll| poll.id }
    return false unless poll_ids.include?(poll_id.to_i)

    poll = Poll.find(poll_id)
    (msg.to_i).between?(1, poll.answers.length)
  end

  def send_txt(from_number, reply)
    number_to_send_to = from_number
    twilio_sid = ACCOUNT_SID
    twilio_token = ACCOUNT_TOKEN
    twilio_phone_number = TWILIO_PHONE

    @twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token
    @twilio_client.account.sms.messages.create(
      :from => "+1#{twilio_phone_number}",
      :to => number_to_send_to,
      :body => reply
    )
    render :json => "success!"

  end
end
