import React, { Component } from 'react';
import Guid from 'guid';
import {
    Grid,
    Row,
    Col,
    Form,
    FormControl,
    Button,
    ListGroup,
    ListGroupItem,
    Nav,
    Navbar,
    NavItem,
    InputGroup,
    Modal,
} from 'react-bootstrap';
import RealtimeClient from './RealtimeClient';
import './App.css';

const getClientId = () => 'web-client:' + Guid.raw();

const getMessageId = () => 'message-id:' + Guid.raw();

const User = (user) => (
    <ListGroupItem key={user.clientId}>{ user.username }</ListGroupItem>
)

const Users = ({ users }) => (
    <div id="sidebar-wrapper">
        <div id="sidebar">
            <ListGroup>
                <ListGroupItem key='title'><i>Connected users</i></ListGroupItem>
                { users.map(User) }
            </ListGroup>
        </div>
    </div>
);

const Message = (message) => (
    <ListGroupItem key={message.id}><b>{message.username}</b> : {message.message}</ListGroupItem>
)

const ChatMessages = ({ messages }) => (
    <div id="messages">
        <ListGroup>
            <ListGroupItem key='title'><i>Messages</i></ListGroupItem>
            { messages.map(Message) }
        </ListGroup>
    </div>
);

const ChatHeader = ({ isConnected }) => (
    <Navbar fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                Serverless IoT chat demo
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem>{ isConnected ? 'Connected' : 'Not connected'}</NavItem>
        </Nav>
    </Navbar>
);

const ChatInput = ({ onSend }) => {
    const onSubmit = (event) => {
        onSend(this.input.value);
        this.input.value = '';
        event.preventDefault();
    }
    return (
        <Navbar fixedBottom fluid>
            <Col xs={9} xsOffset={3}>
                <Form inline onSubmit={ onSubmit }>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Type your message"
                            inputRef={ref => { this.input = ref; }}
                        />
                        <InputGroup.Button>
                            <Button type="submit" >Send</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Form>
            </Col>
        </Navbar>
    );
};

const ChatWindow = ({ users, messages, onSend }) => (
    <div>
        <Grid fluid>
            <Row>
                <Col xs={3}>
                    <Users
                        users={ users }
                    />
                </Col>
                <Col xs={9}>
                    <ChatMessages
                        messages={ messages }
                    />
                </Col>
            </Row>
        </Grid>
        <ChatInput onSend={ onSend }/>
    </div>
);

class UserNamePrompt extends Component {
    constructor(props) {
        super(props);

        this.state = { showModal: true }
    }

    render() {
        const onSubmit = (event) => {
            if (this.input.value) {
                this.props.onPickUsername(this.input.value);
                this.setState({ showModal: false });
            }
            event.preventDefault();
        }
        return (
            <Modal show={this.state.showModal} bsSize="sm">
                <Form inline onSubmit={ onSubmit }>
                    <Modal.Header closeButton>
                        <Modal.Title>Pick your username</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            type="text"
                            placeholder="Type your username"
                            inputRef={ref => {
                                this.input = ref;
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Ok</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.onSend = this.onSend.bind(this);
        this.connect = this.connect.bind(this);

        this.state = {
            users: [],
            messages: [],
            clientId: getClientId(),
            isConnected: false,
        };
    }

    connect(username) {
        this.setState({ username });

        this.client = new RealtimeClient(this.state.clientId, username);

        this.client.connect()
            .then(() => {
                this.setState({ isConnected: true });
                this.client.onMessageReceived((topic, message) => {
                    if (topic === 'client-connected') {
                        this.setState({ users: [...this.state.users, message] })
                    } else if (topic === 'client-disconnected') {
                        this.setState({ users: this.state.users.filter(user => user.clientId !== message.clientId) })
                    } else {
                        this.setState({ messages: [...this.state.messages, message] });
                    }
                })
            })
    }

    onSend(message) {
        this.client.sendMessage({
            username: this.state.username,
            message: message,
            id: getMessageId(),
        });
    };

    render() {
        return (
            <div>
                <ChatHeader
                    isConnected={ this.state.isConnected }
                />
                <ChatWindow
                    users={ this.state.users }
                    messages={ this.state.messages }
                    onSend={ this.onSend }
                />
                <UserNamePrompt
                    onPickUsername={ this.connect }
                />
            </div>
        );
    }
}

export default App;
