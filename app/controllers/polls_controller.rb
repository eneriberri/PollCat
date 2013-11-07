class PollsController < ApplicationController
  before_filter :require_current_user, :only => [:edit, :update, :destroy, :new]

  def send_text_message
    number_to_send_to = CALLER_ID

    twilio_sid = ACCOUNT_SID
    twilio_token = ACCOUNT_TOKEN
    twilio_phone_number = TWILIO_PHONE

    @twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token

    @twilio_client.account.sms.messages.create(
      :from => "+1#{twilio_phone_number}",
      :to => number_to_send_to,
      :body => "Howdy! Thanks for voting. -Poll Cat :3"
    )
    render :index

  end

  def new
    render :new
  end

  def create
    @poll = Poll.new(params[:poll])
    @poll.answers.new(params[:answers].values)
    if @poll.save
      #render :json => @poll
      redirect_to "#/polls/#{@poll.id}"
    else
      render :json => @poll.errors.full_messages
    end
  end

  def destroy
    @poll = Poll.find(params[:id])
    @poll.destroy
    redirect_to polls_url
  end

  def show
    @poll = Poll.find(params[:id])
    #render :show
    render :json => @poll.to_json(:include => :answers)
  end

  def index
    @polls = Poll.all
    message_body = params["Body"]
    from_number = params["From"]

    puts params
    render :index
    #render :json => @polls.to_json(:include => :answers)
  end

  # # Use the Twilio REST API to initiate an outgoing call
 #  def makecall
 #    if !params['number']
 #      redirect_to :json => '.', 'msg' => 'Invalid phone number'
 #      return
 #    end
 #
 #    # parameters sent to Twilio REST API
 #    data = {
 #      :from => CALLER_ID,
 #      :to => params['number'],
 #      :url => BASE_URL + '/reminder',
 #    }
 #
 #    begin
 #      client = Twilio::REST::Client.new(ACCOUNT_SID, ACCOUNT_TOKEN)
 #      client.account.calls.create data
 #    rescue StandardError => bang
 #      redirect_to :json => '.', 'msg' => "Error #{bang}"
 #      return
 #    end
 #
 #    redirect_to :json => '', 'msg' => "Calling #{params['number']}..."
 #  end

  def edit
    render :edit
  end

  def update
    @poll = Poll.find(params[:id])

    if @poll.update_attributes(params[:poll])
      redirect_to poll_url(@poll)
    else
      render :json => @poll.errors.full_messages
    end
  end
end
