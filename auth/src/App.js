import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component{
    state = { loggedIn : null};

    componentWillMount(){
        firebase.initializeApp({
            // ###KEYS GO HERE
        });
        firebase.auth().onAuthStateChanged( (user) => {
            if(user){
                this.setState({ loggedIn : true } );
            }
            else{
                this.setState({ loggedIn : false });
            }
        });
    }

    render(){
        return (
            <View>
                <Header headerText= "Authentication" />
                <View>
                    {this.renderContent()}
                </View>
            </View>
        );
    }

    renderContent() {
        switch (this.state.loggedIn){
            case true:
                return (
                    <Button onPress= { () => firebase.auth().signOut()} >
                        Log Out
                    </Button>
                );
            case false: return <LoginForm />;
            default: return <Spinner size="large"/>;
        }
    }
}

export default App;
