import { async } from '@firebase/util'
import React, {useState, useEffect} from 'react'
import VoxeetSDK from "@voxeet/voxeet-web-sdk"

const Trycry = ({user}) => {



    const [conferenceAlias, setconferenceAlias] = useState("")
    const [participantlist, setparticipantlist] = useState([])

  

    const initUI = () => {
        const nameMessage = document.getElementById("name-message");
        nameMessage.innerHTML = `You are logged in as ${user.email}`;
        };

    useEffect(() => {
        if(user){
            
        }
        async function main() {
            const ck = process.env.REACT_APP_CONSUMER_KEY + "=="
            const sk = "-"+process.env.REACT_APP_CONSUMER_SECRET + "="
            console.log(user)
            VoxeetSDK.initialize(ck,sk)
            try {
                // Open the session here !!!!
                await VoxeetSDK.session.open({ name: user.email })
                initUI()
            } catch (e) {
                alert('Something went wrong : ' + e)
            }
        }
        main();
    }, user)


    function joinroom() {
        

        /*
        1. Create a conference room with an alias
        2. Join the conference with its id
        */
        VoxeetSDK.conference.create({ alias: conferenceAlias })
            .then((conference) => VoxeetSDK.conference.join(conference, {}))
            .then(() => {
                console.log('join')
            })
            .catch((err) => console.error(err));
    };
    
    const addParticipantNode = participant => {
        let temp = participantlist
        if (participant.id === VoxeetSDK.session.participant.id) return;
        if(!participantlist.includes(participant.info.name)){
            temp.push(participant.info.name)
            console.log(temp)
            setparticipantlist(temp)
        }
    }

    useEffect(() => {
        console.log(participantlist)
    }, [participantlist])

    VoxeetSDK.conference.on("streamAdded", (participant, stream) => {
        console.log("stream added")
        addParticipantNode(participant);
    });

    function leaveroom(){
        VoxeetSDK.conference
        .leave()
        .then(() => {
            const result = participantlist.filter(name => name != VoxeetSDK.session.participant.info.name);
            setparticipantlist(result)
        })
        .catch((err) => console.error(err));
    }

    
    return (

        <div>
           <h1 id="name-message">Logging in...</h1>
           <input type="text" value={conferenceAlias} onChange={e => setconferenceAlias(e.target.value)}/>
           <button onClick={e => joinroom()}>join</button>
           <button id="leave-btn" onClick={e => leaveroom()}>Leave</button>
           <div id="participants">
                <h3>Participants</h3>
                <ul id="participants-list"></ul>
                {console.log(participantlist, "from return func")}
                {participantlist.map(item => {
                    return <h1>{item}</h1>
                })}
           </div>
        </div>
    )
}

export default Trycry