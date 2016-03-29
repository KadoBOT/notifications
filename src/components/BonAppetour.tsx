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

interface IAppProps {
}

interface IAppState {
  notifications? : number;
  open? : boolean;
  messages? : Array<{type?: string, text?: string}>;
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
  };

  public addNotification = () => {
    let m = this.state.messages;
    let type = ['message', 'booking', 'inquiry', 'status', 'system']
    let random = Math.round(Math.random() * 5);
    let messageArray = {type: type[random], text: 'Lorem Ipsum Dolor Sit Amet'}
    let messageState = m.push(messageArray);
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
            title={`${this.state.notifications} new notifications`}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {this.state.notifications === 0
            ? <span>No new notifications</span>
            : this.state.messages.map((message, i) => {
                if(message.type === 'message') return <div key={i}> <Message /><h3>New Message</h3><h5>{message.text}</h5><Divider /></div>
                if(message.type === 'booking') return <div key={i}> <DateRange /><h3>New Booking</h3><h5>{message.text}</h5><Divider /></div>
                if(message.type === 'inquiry') return <div key={i}> <Payment /><h3>New Inquiry</h3><h5>{message.text}</h5><Divider /></div>
                if(message.type === 'status')  return <div key={i}><Update /><h3>New Status</h3><h5>{message.text}</h5><Divider /></div>
                if(message.type === 'system')  return <div key={i}><Info /><h3>New Message from BonAppetour</h3><h5>{message.text}</h5><Divider /></div>
              })
            }
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
