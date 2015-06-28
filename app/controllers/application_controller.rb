class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def emails
    current_inbox = Inbox.find_by(slug: cookies[:maildump_inbox]) 
    @messages =  current_inbox.present? ? EmailMessage.where(inbox_id: current_inbox.id) : []
    respond_to do |format|
      format.json { render :json => @messages }
    end
  end
end
