$(function() {
  
  var Message = Backbone.Model.extend({
    defaults: function() {
      return {
        to: "to@default.com",
        from: "from@default.com",
        subject: "Default Subject",
        body: "Default message body."
      };
    },
  });

  var MessageCollection = Backbone.Collection.extend({
    model: Message,
    url: '/emails.json'
  });

  var Messages = new MessageCollection();

  var MessageView = Backbone.View.extend({
    tagName: "div",
    className: "message-container",
    template: _.template($('#message-template').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var MessagesView = Backbone.View.extend({
    
    el: $('#messages'),
    
    tagName: "div",

    msgCount: 0,

    initialize: function() {
      
      this.listenTo(Messages, 'reset', this.loadMessages);

      Messages.fetch();
      this.intervalHandle = setInterval(function() {
        console.log("Looking for new messages...");
        Messages.fetch({ reset: true }); 
      }, 5000);
      
      var _this = this;

      //Handle death notice from timer event. 
      $(document).on("simpletimer:stopped", function() { _this.appendWarning(); });
      
      $('#messages').on('click', '.message-container', function(e) {
        $('.message-container').removeClass('selected');
        console.log(e.target);
        $(e.target).parents('.message-container').toggleClass('selected');
      });

    },

    render: function() {
      this.loadMessages();  
    },

    loadMessage: function(message) {
      var view = new MessageView({model: message});
      this.$el.append(view.render().el);
    },

    appendWarning: function() {
      $('#messages').append(_.template($('#warning-template').html())({}));
      window.clearInterval(this.intervalHandle);
    },

    loadMessages: function() {
      if (Messages.length == this.msgCount) { 
        console.log("skipping reload - no new messages.");
        return false; 
      } else if (this.msgCount > 0 && Messages.length == 0) {
        console.log("This inbox is dead. Uh oh!");
        this.appendWarning();
      } else {
        console.log("New message, let's rebuild.");
        this.msgCount = 0;
        this.$el.empty();             
        Messages.each(function(message) {
          this.msgCount++;
          this.loadMessage( message );
          console.log("Message #" + this.msgCount + " added!");
        }, this);
      }
    }

  });

var App = new MessagesView();


});
