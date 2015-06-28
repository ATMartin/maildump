class InboxController < ApplicationController

  def index
    current_inbox = cookies[:maildump_inbox]
    if current_inbox.present? && Inbox.exists?(slug: current_inbox)
      @inbox = Inbox.find_by(slug: current_inbox)
    else 
      new_slug = Inbox.slug_gen
      expiry = Time.now + MD_DEFAULT_DURATION
      cookies[:maildump_inbox] = { value: new_slug, expires: expiry }
      cookies[:maildump_dies_at] = { value: expiry, expires: expiry }
      @inbox = Inbox.create!(slug: new_slug)
    end
  end

end
