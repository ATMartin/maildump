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
    tagName: "tr",
    template: _.template($('#message-template').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
    
  var MessagesView = Backbone.View.extend({
    
    el: $('#messages'),
    
    tagName: "table",

    initialize: function() {
      
      this.listenTo(Messages, 'reset', this.loadMessages);
    
      Messages.fetch();
      setInterval(function() {
        console.log("Looking for new messages...");
        Messages.fetch(); 
      }, 5000);
    },

    render: function() {
      this.loadMessages();  
    },

    loadMessage: function(message) {
      console.log("loading messages...");
      var view = new MessageView({model: message});
      this.$el.append(view.render().el);
    },

    loadMessages: function() {
      Messages.each(this.loadMessage, this);
    }

  });

var App = new MessagesView();


});
