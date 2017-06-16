import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage} from 'react-native';

let SQLite = require('react-native-sqlite-storage');
  var db;
export default class myApp extends Component {

  constructor(props) {
    super(props);
    db = SQLite.openDatabase({name: 'test.db', createFromLocation: "~example.db", location: 'Library' }, this.openCB, this.errorCB);
    this.state = {
      name: '',
      bp: '',
      weight: '',
      temperature: '',
      error: '',
      info: ''
    }
  }

  componentWillUnmount(){
        db.close(()=>this.setState({info:"DB Closed"}),()=>this.setState({error:"Error Closing DB"}));
  }

  errorCB(err) {
  }

  successCB() {
  }

  openCB() {
  }

  submit() {
    if(db){
    try {
      db.transaction((tx) => {
        try {
          tx.executeSql('DROP TABLE IF EXISTS Patient1;');
          tx.executeSql('CREATE TABLE IF NOT EXISTS Patient1(name VARCHAR(55),bp VARCHAR(55),weight VARCHAR(55),temperature VARCHAR(55))', [], ()=>this.setState(info1:"Creation Success"), ()=>this.setState(error1:"Creation Error"));
            this.setState({info:"Table Query !!!"});
        } catch (error) {
          this.setState({info:"Caught Error"+error});
        }
      });
      this.setState({info:"Table created !!!"});
     } catch (error) {
       this.setState({error:"ERRORRRRR"});
    }
    try {
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO Patient1 (name,bp,weight,temperature) VALUES (\'asd\', \'sdf\', \'asd\', \'yrty\');', [], ()=>this.setState(info1:"Insertion Success"), ()=>this.setState(error1:"Insertion Error"));
      });
      this.setState({error:"Record Inserted !!!"});
     } catch (error) {
       this.setState({error:"ERRORRRRR"});
    }
  }
  else{
    this.setState({error:"DB not GOTTTT"});
  }
    /*try {
      AsyncStorage.setItem('patientData', JSON.stringify({
        name: this.state.name,
        bp: this.state.bp,
        weight: this.state.weight,
        temperature: this.state.temperature
      }));
    } catch (error) {
      this.setState(error);
    }*/
  }

  retrieve() {
    try {
      this.setState({info:"Retrieving..."});
      db.transaction((tx) => {
        this.setState({error:"After Trans..."});
        tx.executeSql('SELECT * FROM Patient1', [], (tx, results) => {
          this.setState({info:"# Rows Fetched"});
          var len = results.rows.length;
          
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            this.setState({ name: row.name, bp: row.bp, weight: row.weight, temperature: row.temperature });
          }
        });
      });
     } catch (error) {
       this.setState({info:"ERRORRRRR"});
    }


    /*try {
      AsyncStorage.getItem('patientData').then((value) => {
        if (value) {
          this.setState({ info: value });
          this.setState(JSON.parse(value));
        }
        else {
          this.setState({ info: 'value Not received !!!' });
        }
      }).done();
    } catch (error) {
      this.setState(error);
    }
*/
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Patient Details
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text>Name: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Enter Name'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>BP: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            onChangeText={(bp) => this.setState({ bp })}
            value={this.state.bp}
            placeholder='Enter Blood Pressure'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Weight: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            onChangeText={(weight) => this.setState({ weight })}
            value={this.state.weight}
            placeholder='Enter Weight'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Temperature: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            onChangeText={(temperature) => this.setState({ temperature })}
            value={this.state.temperature}
            placeholder='Enter Temperature'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => this.submit()}
            title="Submit !"
            color="blue"
            accessibilityLabel="Save data to database">
            Submit !
        </Button>
          <Button
            onPress={() => this.retrieve()}
            title="Retrieve !"
            color="green"
            accessibilityLabel="Retrieve data from database">
            Submit !
        </Button>
        </View>

        <View>
          <Text>Name: {this.state.name} BP: {this.state.bp} Temp:{this.state.temperature} Weight:{this.state.weight}</Text>
        </View>

        <View>
          <Text>Error: {this.state.error}</Text>
        </View>

        <View>
          <Text>Info: {this.state.info}</Text>
        </View>

        <View>
          <Text>Error1: {this.state.error1}</Text>
        </View>

        <View>
          <Text>Info1: {this.state.info1}</Text>
        </View>
      </View>

    );
  }
}
//<Button1 blabel='Submit' onPressAction={this.onPressAction().bind(this)}/>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

var listStyles = StyleSheet.create({
  li: {
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  liContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 15,
  },
  liIndent: {
    flex: 1,
  },
  liText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: -3.5,
    marginTop: -3.5,
  },
});


AppRegistry.registerComponent('myApp', () => myApp);
