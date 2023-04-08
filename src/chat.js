import React, { Component } from "react";
import firebase from "firebase";
export class Chat extends Component {
    constructor() {
        super();

        this.state = { users: [] };

        const firebaseConfig = {
            apiKey: "AIzaSyDoZtGBDXFlkOzxZzbje4fw4LRa5BhFBlQ",
            authDomain: "fir-3e1ef.firebaseapp.com",
            databaseURL: "https://fir-3e1ef-default-rtdb.firebaseio.com",
            projectId: "fir-3e1ef",
            storageBucket: "fir-3e1ef.appspot.com",
            messagingSenderId: "376191872764",
            appId: "1:376191872764:web:1e625d0b8d389c423d7179",
            measurementId: "G-P1Z2ZHB51H"
        };
        if (firebase.apps.length == 0) {
            firebase.initializeApp(firebaseConfig);
        }
        let database = firebase.database();
        var ref = database.ref("users");
        ref.on("value", snap => {

            this.setState({ users: snap.val() });
        });
    }

    send = () => {
        const newname = document.getElementById('name').value;
        const newmsg = document.getElementById('msg').value;
        const newuser = this.state.users;

        newuser.push({ name: newname, msg: newmsg });
        this.setState({ users: newuser });

        document.getElementById('name').value = '';
        document.getElementById('msg').value = '';
        let database = firebase.database();
        var ref = database.ref("users/" + this.state.users.length);
        ref.set({ name: newname, msg: newmsg });
    

    }
    render() {
        return <div className="container" style={{ width: 700, paddingTop: 20 }}>
            <div>
                {this.state.users.map(i => {
                    return <div >
                        <span class="d-block p-2"><strong>{i.name}</strong></span>
                        <span class="d-block p-2">{i.msg}</span>
                    </div>


                })}
            </div>
            <input type="text" class="form-control" placeholder="Wirte Yourname" id="name" />
            <div class="input-group ">
                <input type="text" class="form-control" placeholder="Write Massage " id="msg" />
            </div>
            <button class="form-control btn btn-outline-secondary" style={{ marginTop: 8 }} type="button" onClick={this.send} >Send</button>
        </div>
    }
}
