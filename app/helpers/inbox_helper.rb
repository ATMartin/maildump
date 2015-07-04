module InboxHelper

  def to_pretty_time duration
    minutes = ( duration / 60 ).round
    seconds = ( duration % 60 ).round
    minutes = minutes < 10 ? "0#{minutes}" : minutes
    seconds = seconds < 10 ? "0#{seconds}" : seconds
    "#{minutes}:#{seconds}"
  end

end
