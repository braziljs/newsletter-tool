# Newsletter Tool
The __BrazilJS Weekly Newsletter__ is one of the best Brazilian resources to keep up-to-date with technology in general, specially Web Technologies.  
Every week, more than 15,000 developers get the latest and more relevant news, tools, articles, etc., in their inboxes.  
BrazilJS crew is responsible for the curatorship and review, but the main content feed come from the community.  
Everything is done in our [BrazilJS Weekly repository](https://github.com/braziljs/weekly), where people can share all kinds of content.  
After that, it's time to filter what is going to be listed in our newsletter by reading the content and validating every single suggestion.  
That's our secret, we do love to be up-to-date and we care about great content, so we make sure that every sent email is carefully handcrafted by our editors.  
That's a hard but necessary work.  
However, that's a lot of steps in this process which can be automated, and with that in mind, we created this tool.  

The `newsletter-tool` aims to help BrazilJS' editors.  
Here are some key steps done every single week to build our beloved newsletter:

- Create a new campaign (normally a copy of the last one) on [Mailchimp](https://mailchimp.com/) (the service we use to create and send the newsletter)  
- Sort in categories (normally *news*, *articles*, *tools* and *others*)  
- Sort the content by relevance  
- Insert each link on the campaign email template 
- Review

That's just the main steps 😓  
As we have a video version of the newsletter ([BrazilJS Weekly on YouTube](https://www.youtube.com/braziljs)) and a text version on [BrazilJS' portal](https://braziljs.org/), which one with a different approach, the task could be tedious.  

The `Newsletter Tool` is basically a JavaScript piece of software automation tool.  
Of course, the tool is focused on solving our own problems and is 100% based on our community-curatorship process, but we strong believe in this model, so every Newsletter owner can try to adapt to it and use and evolve the tool.

# How to run
```javascript
npm install
npm start
```
Go to `http://localhost:8080/` and you should see a simulated newsletter based on our last open issue on the BrazilJS Weekly repository.  

![BrazilJS Weekly Tool in action](https://i.imgur.com/GpToL45.png)
