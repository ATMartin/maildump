# Maildump
-------------

### Purpose

#### Everyone wants an email address.
Whether it's for a free trial, "more information", or even just to read the damn news - EVERYONE wants your email address. Moreover, most services now also require verification of the address - no more *"dont.email@me.com*! This results in a torrent of unwanted messaging if left unchecked. 

The current solutions to this problem are:

- **Multiple Inboxes**: Special emails specifically for spam. This requires juggling usernames & passwords and rememebering where you signed up for what and with who.

- **Filters / Whitelists**: Additional spam protection on your inbox. Varies from provider to provider, but typically involves continuing configuration and domain-by-domain whitelisting. 

- **Self-Destructing Services**: Sites like [10minutemail](http://www.10minutemail.com) are the most attractive solution, but many providers have minimized their efficacy by blacklisting addresses from known "short-term" domains or by setting a 15-20 minute delay on their confirmation messages. 

### My solution? Use the domain you already have!

**Maildump** is a simple Ruby on Rails app that will manage the creation & destruction of temporary email addresses for ANY domain. This control lets you set your own delay period and prevents sites with domain blacklists from blocking your temporary box. After your delay period passes, your inbox explodes and future emails to that address will be refused. 


### Setup is simple!

1. **Run Maildump on any server or hosting service you'd like.** 

	- Maildump just needs a Rails host - free / dev-tier services with 24hr uptime will do fine. 
2. **Create appropriate DNS records.**

  - Maildump relies on an email subdomain - you can configure this with an A & MX record. 
3. **Configure [Mandrill](http://www.mandrill.com)**

  - Mandrill is a fantastic service from MailChimp that will handle routing your inbound emails appropriately. **I hope to automate this part in the near future.**
4. **Start Dumping!**

  - Head to Maildump's index route to get started. You'll be given your first inbox and you're ready to go!

### This product is currently in development. I'm not seeking pull requests at this time. Just a personal project. :) 
