class Inbox < ActiveRecord::Base

  has_many :EmailMessages
   
  validates :slug, presence: true
 
  def address
    "#{self.slug}@#{MD_EMAIL_SUBDOMAIN}" 
  end

  def self.slug_gen
    SecureRandom.hex(3)
  end
  
end
