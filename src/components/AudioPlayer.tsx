import { useRef, useState, useEffect } from "react";
import Image from "../../node_modules/next/image";
import { AgentProps } from "../pages/voices/index";
import styles from '../styles/components/AudioPlayer.module.css'

interface AudioPlayerProps {
  agentInfo: AgentProps,
  audio: string
}

export default function AudioPlayer(props : AudioPlayerProps){

  const audioPlayer = useRef();
  const [audio, setAudio] = useState<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState<Boolean>(false)

  useEffect(() => {
    if (props.agentInfo?.voiceLine?.mediaList[0]?.wave) {
      setAudio(null)
      let audioTemp = new Audio(props.agentInfo.voiceLine?.mediaList[0].wave)
      audioTemp.addEventListener(
        "loadeddata",
        () => {      
          audioTemp.volume = .75;
          setAudio(audioTemp) 
        },
        false
      );  
  
      audioTemp.addEventListener(
        "ended", 
        () => {
          setPlaying(false)
        },
        false
      );
    }    
  }, [props.agentInfo])

  function play(){    
    if(playing){
      audio.pause();
    }else{
      audio.play();                  
    } 

    setPlaying(p => !p)   
  }

  useEffect(() => {
    
  }, [playing])
  
  const columns = [0,0.2,0.1,0.4,0.3,0.6,0.5,0.8,0.7,1,0.9,1.2,1.1,1.4,1.3,1.5]

  return (
    <div> 
      <div 
        ref={audioPlayer} 
        className={styles.audioPlayer}
        style={{
          background: `linear-gradient(107.94deg, #${props.agentInfo?.backgroundGradientColors[1]} 0%, #${props.agentInfo?.backgroundGradientColors[2]} 80.73%)`
        }}
      >        
        <div className={styles.spectre }>
          {
            columns.map((item, index) => (
              <div 
                key={index}
                style={{                                                             
                  animation: playing ? `0.5s ease-in-out ${item}s infinite alternate none running animGrow` : 'none'                                    
                }}
              />
            ))
          }          
        </div>
        {
          audio ?
            <Image
              src={playing ?  "/audioItens/pause.svg" : "/audioItens/play.svg"} 
              alt={playing ? "Pause" : "Play"} 
              onClick={play}
              width={30}
              height={30}
              style={{
                cursor: "pointer",           
              }}
            />   
          :
            <p style={{color: 'white', justifySelf: 'center'}}>Carregando...</p>
        }
                               
      </div>    
      <style jsx>{`
        @keyframes animGrow {
          0%{
            transform: scaleY(0.15);
          }
          100%{
            transform: scaleY(1);
          }
        }
      `}        
      </style>
    </div>  
  )
}