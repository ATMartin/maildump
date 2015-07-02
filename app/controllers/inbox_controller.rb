class InboxController < ApplicationController

  def index
    current_inbox = cookies[:maildump_inbox]
    if current_inbox.present? && Inbox.exists?(slug: current_inbox)
      @inbox = Inbox.find_by(slug: current_inbox)
      @emails = EmailMessage.where(inbox_id: @inbox.id).to_a
    else 
      new_slug = Inbox.slug_gen
      expiry = Time.now + MD_DEFAULT_DURATION
      cookies[:maildump_inbox] = { value: new_slug, expires: expiry }
      cookies[:maildump_dies_at] = { value: expiry.to_i, expires: expiry }
      @inbox = Inbox.create!(slug: new_slug)
      @emails = []
    end
  end

end
