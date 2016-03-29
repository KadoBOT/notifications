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

interface IAppProps {
}

interface IAppState {
  notifications? : number;
  open? : boolean;
  messages? : Array<{type?: string, text?: string, read?: boolean}>;
  received? : boolean;
}

class BonAppetour extends React.Component<IAppProps, IAppState>{

  public state : IAppState;

  constructor(props : IAppProps){
    super(props);
    this.state = {notifications: 0, open: false, messages: [], received: false};
  }

  public handleOpen = () => {
    this.setState({open: true});
  };

  public handleClose = () => {
    this.setState({open: false, notifications: 0});
    this.state.messages.map( message => message.read = true)
  };

  public addNotification = () => {
    let m = this.state.messages;
    let type = ['message', 'booking', 'inquiry', 'status', 'system']
    let random = Math.round(Math.random() * 4);
    let messageArray = {type: type[random], text: 'Lorem Ipsum Dolor Sit Amet', read: false}
    let messageState = m.unshift(messageArray);
    this.setState({notifications: this.state.notifications + 1, received: true, messages: m});
  };

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
          this.state.notifications === 0
          ? <IconButton tooltip="Notifications" onTouchTap={this.handleOpen}><NotificationsIcon/></IconButton>
          : <Badge
          badgeContent={this.state.notifications}
          badgeStyle={{top: 20, right: 20}}
          style={{padding: '24px 24px 0px 12px', marginTop: '-16px'}}
          >
          <IconButton tooltip="Notifications" onTouchTap={this.handleOpen}>
          <NotificationsIcon/>
          </IconButton>
          </Badge>}
        />
        <div>
          <h1>Simulate new notifications:</h1>
          <RaisedButton label="Add Notification" onTouchTap={this.addNotification}/>
        </div>
        <div>
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
              : this.state.messages.map((message, i) => {
                  let isRead;
                  if(!message.read){
                    isRead = {backgroundColor: 'rgba(119, 119, 119, 0.15)', borderBottom:' 1px solid #BDBDBD'};
                  }
                  if(message.type === 'message') return <ListItem primaryText="Message" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<Message />} />}></ListItem>
                  if(message.type === 'booking') return <ListItem primaryText="Booking" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<DateRange/>} />}></ListItem>
                  if(message.type === 'inquiry') return <ListItem primaryText="Inquiry" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<Payment />} />}></ListItem>
                  if(message.type === 'status')  return <ListItem primaryText="Status" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<Update />} />}></ListItem>
                  if(message.type === 'system')  return <ListItem primaryText="Global Message" style={isRead} secondaryText={message.text} key={i} leftAvatar={<Avatar icon={<Info />} />}></ListItem>
                })
              }
            </List>
          </Dialog>
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
