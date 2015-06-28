
namespace :data do
  
  desc "It deletes old inboxes and their messages."
  task :clean_expired_records => :environment do
    Inbox.where("created_at < ?", Time.now - MD_DEFAULT_DURATION).each do |inbox|
      puts "Inbox #{inbox.id} is bad!"
      EmailMessage.where(:inbox_id => inbox.id).delete_all
      inbox.delete
    end  
  end

end
