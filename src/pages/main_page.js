import React, { Component } from 'react'
import Card from "../components/quizCard"
import Navbar from "../components/navbar"
import { getDatabase, ref, set, child, get } from "firebase/database";
import "../style/home.css"

function Rand(NewDictionary){
    const keys = Object.keys(NewDictionary);
    let i = keys.length - 1;
    const j = Math.floor(Math.random() * i);
    return NewDictionary[keys[j]];
  }

export class main_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            num: 132,
            dataw: [],
            // sizeList: ['small', 'medium', 'large'],
            // sizeItem: "medium",
            styles: {
                pin_container: {
                    // width: calc(85vw - 80px);
                    // height: calc(100vh - 80px);
                    // background-color: #6738DC;
                    // overflow-y: scroll;
                    // padding: 40px;

                    // overflowY: scroll,
                    margin: 0,
                    // height: calc(100vh),
                    padding: 0,
                    height: 'calc(100vh - 80px)',
                    width: 'calc(85vw - 80px)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 250px)',
                    gridAutoRows: '10px',
                    position: 'absolute',
                    // left: '50%',
                    // transform: 'translateX(-50%)',
                    justifyContent: 'center',
                    overflow: "scroll"
                    // backgroundColor: 'black'
                }
            }
        };
    }


    getNumOfQuizes = async () => {
        const dbRef = ref(getDatabase());
        await get(child(dbRef, 'quizes/')).then((snapshot) => {
            if (snapshot.exists()) {
                const numOfQuizes = snapshot.size
                this.setState({
                    // num: numOfQuizes,
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

    componentDidMount = async () => {
        await this.getNumOfQuizes()
        // console.log(Rand(["small", "medium", "large"]));
    }

//     var items = ['Yes', 'No', 'Maybe'];
// var item = items[Math.floor(Math.random() * items.length)];

    render() {
        const quizes = [];
        for (let i = 1; i <= this.state.num; i++) {
            // this.sizeItem = ['small', 'medium', 'large'][Math.floor(Math.random() * 3)]
            // this.setState{
            //     "sizeItem": ['small', 'medium', 'large'][Math.floor(Math.random() * 3)]
            // }
            quizes.push(<Card id={i} size={"medium"}/>);
            quizes.push(<Card id={i} size={"large"}/>)
        }

        return (
            <div className="homepage">
                <Navbar />
                <div className="main_container">
                    <div style={this.state.styles.pin_container}>
                    {quizes}
                    </div>

                    {/* <div className="card-wrapper">
                        {quizes}
                    </div> */}
                </div>
            </div>
        )
    }
}


export default main_page