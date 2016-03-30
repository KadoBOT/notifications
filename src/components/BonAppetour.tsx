import * as React from "react";
import AppBar from 'material-ui/lib/app-bar';
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import Message from 'material-ui/lib/svg-icons/communication/message';
import DateRange from 'material-ui/lib/svg-icons/action/date-range';
import Update from 'material-ui/lib/svg-icons/action/update';
import Payment from 'material-ui/lib/svg-icons/action/payment';
import Info from 'material-ui/lib/svg-icons/action/info';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

//Typescript requires you to create props and state interfaces, since we are
//not receiving any props from parent, we create an empty interface
interface IAppProps {
}

//We define the type of our states, so we dont send them wrong values, like
//sending a string to the notification state
interface IAppState {
  notifications? : number;
  open? : boolean;
  messages? : Array<{type?: string, text?: string, read?: boolean}>;
  received? : boolean;
}

class BonAppetour extends React.Component<IAppProps, IAppState>{

  public state : IAppState;

//our state. notifications are the number of unread notifications. open is for
//the dialog when you click the notification, messages is an array of the
//notification messages and received is for the snackbar on the bottom.
  constructor(props : IAppProps){
    super(props);
    this.state = {notifications: 0, open: false, messages: [], received: false};
  }

//when we click the notification, we set the state of our dialog to true, so
//it is showed on the screen
  public handleOpen = () => {
    this.setState({open: true});
  };

//when we click to close the notification dialog, we set the state of it to
//false and set notifications unread to 0. Also, we ran throught each message
//and set it read state to true. So we know which message has been read when
//we receive new notifications
  public handleClose = () => {
    this.setState({open: false, notifications: 0});
    this.state.messages.map( message => message.read = true)
  };

//create a variable to get the current messages, generate a random notification type,
//and push it to the beggining of the variable we just created. Everytime we do that,
//we add 1 to the number of unread notifications, and set our message state to
//match the update notification array we just updated. Also, we set our snackbar
//state to true. So we receive a notification on the bottom.
  public addNotification = () => {
    let m = this.state.messages;
    let type = ['message', 'booking', 'inquiry', 'status', 'system']
    let random = Math.floor(Math.random() * 4);
    let messageArray = {type: type[random], text: 'Lorem Ipsum Dolor Sit Amet', read: false}
    let messageState = m.unshift(messageArray);
    this.setState({notifications: this.state.notifications + 1, received: true, messages: m});
  };

//set the state of our snackbar to false, and make it disappear
  public handleRequestClose = () => {
    this.setState({
      received: false,
    });
  };

  public render(){
    return(
      <div>
        <AppBar
        title="BonAppetour"
        iconElementRight={
/*if no new notifications, we don't show the badge with the number of notifications.*/
          this.state.notifications === 0
          ? <IconButton tooltip="Notifications" onTouchTap={this.handleOpen}><NotificationsIcon/></IconButton>
          : <Badge
/*the badgeContent shows the number of unread notifications*/
          badgeContent={this.state.notifications}
          badgeStyle={{top: 20, right: 20}}
          style={{padding: '24px 24px 0px 12px', marginTop: '-16px'}}
          >
/*onTouchTap fires our handleOpen function, to show dialog.*/
            <IconButton tooltip="Notifications" onTouchTap={this.handleOpen}>
              <NotificationsIcon/>
            </IconButton>
          </Badge>}
        />
        <div>
{/*We fire our addNotification function here*/}
          <h1>Simulate new notifications:</h1>
          <RaisedButton label="Add Notification" onTouchTap={this.addNotification}/>
        </div>
        <div>
{/*This is our dialog, that shows when we click the notificaiton icon*/}
          <Dialog
            title="Notifications"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <List subheader={`${this.state.notifications} unread notifications`}>
              {this.state.messages.length === 0
              ? <ListItem>No new notifications</ListItem>
//If our notification array is not empty, we run throught each of the items
              : this.state.messages.map((message, i) => {
//Here we set a isRead variable to apply a different color to new notifications.
//Is important to note that we need to set the variable outside the if statement,
//otherwise it is unreachable, since let is block scoped.
                  let isRead;
                  if(!message.read){
                    isRead = {backgroundColor: 'rgba(119, 119, 119, 0.15)', borderBottom:' 1px solid #BDBDBD'};
                  }
//for each message.type we give it an unique icon and an unique title.
                  if(message.type === 'message') return <ListItem primaryText="Message" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<Message />} />}></ListItem>
                  if(message.type === 'booking') return <ListItem primaryText="Booking" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<DateRange/>} />}></ListItem>
                  if(message.type === 'inquiry') return <ListItem primaryText="Inquiry" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<Payment />} />}></ListItem>
                  if(message.type === 'status')  return <ListItem primaryText="Status" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<Update />} />}></ListItem>
                  if(message.type === 'system')  return <ListItem primaryText="Global Message" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<Info />} />}></ListItem>
                })
              }
            </List>
          </Dialog>
{/*This is our notification box that shows in the bottom when new notification
  is added. It has a duration of 4 seconds, that can be changed to any number*/}
          <Snackbar
            open={this.state.received}
            message={`You have ${this.state.notifications} new notification(s)`}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </div>
    )
  }
}

export default BonAppetour;
