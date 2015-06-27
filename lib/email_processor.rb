class EmailProcessor

  def initialize (email)
    puts "**********INIT THE EMAIL**********"
    @email = email
  end

  def process
    puts "******TRYING TO GET #{@email.to[0][:token]}!******"
    if !Inbox.select(:slug).include? @email.to[0][:token]
      puts "******NO INBOX FOUND FOR #{@email.to[0][:token]}!*****"
      return
    end
    EmailMessage.create({
      to: @email.to[0][:email],
      from: @email.from[:email],
      subject: @email.subject,
      body: @email.body,
      inbox: Inbox.find_by(slug: @email.to[0].token)
    })
  end

end
