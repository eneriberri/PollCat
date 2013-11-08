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
    @message_body = params["Body"]

    render :show
    #render :json => @poll.to_json(:include => :answers)
  end

  def index
    render :json => Poll.includes(:answers).all, :include => :answers
  end

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
