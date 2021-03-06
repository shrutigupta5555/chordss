
import VoxeetSDK from "@voxeet/voxeet-web-sdk"
import React, {useState, useEffect} from "react";
import endCall from '../images/call-end.svg'
import {BiCopy, BiShareAlt} from 'react-icons/bi'
import Curtain from "../components/curtain";
import Instruments from "./instruments";
import LolPiano from "../components/lolpiano";
import LolDrum from "../components/lol_drum";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from '../components/utils/firebase'
function ParticipantMeeting ({user, participantList, cfname ,leaveroom, started, listeners}){
  
  var details = `Hey, join us at this amazing jam session '${cfname}' happening right now at https://chordzz.web.app`
  
  

  function copy(){
    navigator.clipboard.writeText(details)
    document.getElementById("copytext").innerHTML="copied details to clipboard!"
    setTimeout(function(){
      document.getElementById("copytext").innerHTML=""
    },3000);
  }

  
  function addReaction(emoji){
    db.collection('jams').doc(cfname).update({
      'reaction' : `${user.email} reacted with ${emoji}`
    })
  }

 


  return(
    
    <div className="m-6">

      <div className="flex justify-between ">
        <h1>{cfname}</h1>
        <div className="flex" >
          
        <img src={endCall} alt="" className="h-10 cursor-pointer" onClick={() => leaveroom()}/>
          <h1 className="px-3" id="copytext"></h1>
        <BiShareAlt onClick={() =>  copy()} className="h-8 w-8 cursor-pointer"/>
        </div>
      </div>
        <p className="opacity-60">Tap on emojis to react</p>
      <div className="flex justify-between w-1/3">

        <p className="bg-gray-700 px-2 py-1 cursor-pointer" onClick={e => addReaction(e.target.innerText)}>😍</p>
        <p className="bg-gray-700 px-2 py-1 cursor-pointer" onClick={e => addReaction(e.target.innerText)}>🥺</p>
        <p className="bg-gray-700 px-2 py-1 cursor-pointer" onClick={e => addReaction(e.target.innerText)}>🔥</p>
        <p className="bg-gray-700 px-2 py-1 cursor-pointer" onClick={e => addReaction(e.target.innerText)}>✨</p>
        <p className="bg-gray-700 px-2 py-1 cursor-pointer" onClick={e => addReaction(e.target.innerText)}>💖</p>
      </div>
      <br />
      {console.log(participantList)}
      <div className="flex justify-between flex-col-reverse md:flex-row  gap-12">
        <div className="bg-greyish h-nv w-1/1 md:w-1/3 overflow-y-scroll">
         
          {participantList.length > 0 ? <div>
            Performers:
            {participantList.map(item => {
            return <h1>{item}</h1>
          })}
          </div> : <h1>No performer has joined yet</h1> }
            
          <br /><br /> <br />

          {listeners.length > 0 ? <div>
            Listeners:
            {listeners.map(item => {
            return <h1>{item}</h1>
          })}
          </div> : <h1>No performer has joined yet</h1> }

         
          
        </div>
        <div className="bg-greyish w-1/1 md:w-2/3 h-nv overflow-hidden">
            {!started? <Curtain/>: <center><div><img src="https://media.discordapp.net/attachments/873911460055642152/914948605956202516/Untitled_design_1.gif" alt="" className="h-1/2" /></div></center> }
          
          {/* <Instruments/> */}
          {/* <LolPiano/> */}
          {/* <Instruments/> */}
          {/* <LolPiano/> */}
          {/* <LolDrum/> */}
        </div>
      </div>
      <br />
      <div className="flex justify-between ">
        <h3>attendees</h3>
      </div>
    
    </div>
  )
    
   
    
}





export default ParticipantMeeting;
