# Simulate notifications
This tiny react app simulates a notification widget.  

In a real environment, like Facebook notifications, when someone comments or
like one of your posts, the globe button becomes colored and a red number shows
up. Thats a notification.  

In our app, we simulate a change on the database. This change could be a new
message being sent to an user, a new booking being made, maybe your payment
status has changed and you need to be told of that change, or maybe the website
just want to send you a notification about something.  

If we had a real database running on the background, we could easily watch database
changes, and every time it changes, our state is updated and the notification is
triggered, showing the user that they have something new.  

In this notification app, we follow a simple process tree:
* We start the app with 0 notifications
* If we click the notification icon, it shows that there isn't any notification. We explicitly defined on BonAppetour.tsx what to display when we the notification array is empty
* When we click the add notification, a random notification is generated (it can have 5 different types), and it's pushed to our notification array
* Our app see this state change, and updates our notification icon, showing the number of notifications unread.
* When we open our notification dialog, it render the notification array. When we close the dialog, we mark our messages as read. This will make our notification icon the same as it was before adding any notification (no new notifications).
* If you add new notifications, and open the dialog again, you can see that the new notifications have different colors. Thats because unread and read notifications have distinct styles. And the new messages are marked as unread until you close the dialog.

We didn't used a real database, but if we need to implement this on a real project, this can be easily archived without a lot of code change.
