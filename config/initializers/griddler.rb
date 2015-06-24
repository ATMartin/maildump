require 'email_processor'

Griddler.configure do |config|
  config.processor_class = EmailProcessor
  config.processor_method = :process
  config.reply_delimiter = '--REPLY ABOVE THIS LINE--'
  config.email_service = :mandrill
end
