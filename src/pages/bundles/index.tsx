import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { useRouter } from '../../../node_modules/next/router';
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import styles from '../../styles/pages/Bundles.module.css'

export default function Bundles(){

  const router = useRouter();
  const [dados,setDados] = useState({
    "bundle_image": "https://media.valorant-api.com/bundles/ae0c9cc4-4c03-f8d6-745c-84953db684fc/verticalpromoimage.png",
    "answer": "Ruination",
    "choices": [
      "Ruination",
      "Smite",
      "Nunca Olvidados",
      "Protocol 781-A",
    ]
  });

  useEffect(()=>{
    axios.get('https://api.valdle.com/v1/bundle/random',{
      headers:{
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(res => {
      setDados(res.data)
      console.log(res.data)
    })
  },[])

  function verificaResposta(choice){
    if(choice === dados.answer){
      alert('ACERTO MIZERAVI')
    }else{
      alert('ERÔOOOOU')
    }
  }

  return(
    <div className={styles.containerGeral}>
      <BackButton
        onClick={() => router.push('/')}
      />
      <div className={styles.containerRight}>
        <div className={styles.containerBundle}>
          <div className={styles.flipCard}>
            <div className={styles.flipCardInner}>
              <div className={styles.flipCardBack}>
                <img src={dados.bundle_image} alt="bundle" />
              </div>
              <div className={styles.flipCardFront}>
                <img src="/bundleAssets/BackCard.png" alt="BackCard" />
              </div>
            </div>
          </div> 
          <div className={styles.containerButtons}> 
           {
            dados.choices.map(choice =>(
              <button
                onClick={() => verificaResposta(choice)}
              >
                {choice}
              </button>
            ))
           }
          </div>
        </div>

      </div>
    </div>
  )
}