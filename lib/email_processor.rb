class EmailProcessor

  def initialize (email)
    @email = email
  end

  def process
    return if !Inbox.select(:slug).include? @email.to[0].token
    EmailMessage.create!({
      to: @email.to[0].email,
      from: @email.from[0].email,
      subject: @email.subject,
      body: @email.body,
      inbox: Inbox.find_by(slug: @email.to[0].token)
    })
  end

end
