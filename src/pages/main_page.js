import React, { Component } from 'react'
import Card from "../components/quizCard"
import Navbar from "../components/navbar"
import { getDatabase, ref, set, child, get } from "firebase/database";
import "../style/home.css"

export class main_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            num: 0,
            dataw: []
        };
    }
    getNumOfQuizes = async () => {
        const dbRef = ref(getDatabase());
        await get(child(dbRef, 'quizes/')).then((snapshot) => {
            if (snapshot.exists()) {
                const numOfQuizes = snapshot.size
                this.setState({
                    num: numOfQuizes,
                    dataw: snapshot.val()
                })
                // console.log(this.state.dataw)
                // console.log(this.state.num)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
        });
    }

    componentDidMount = async() =>  {
        await this.getNumOfQuizes()
    }

    render() {
        const quizes = [];
        for (let i = 1; i <= this.state.num; i++) {
            quizes.push(<Card id={i} />);
        }

        return (
            <div className="homepage">
                <Navbar />
                <div className="main_container">
                    <div className="card-wrapper">
                        {quizes}
                    </div>
                </div>
            </div>
        )
    }
}


export default main_page