class InboxController < ApplicationController

  def index
    @inbox = Inbox.create!(slug: Inbox.slug_gen)
  end

end
