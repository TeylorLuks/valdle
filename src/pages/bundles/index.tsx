import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import Head from '../../../node_modules/next/head';
import { useRouter } from '../../../node_modules/next/router';
import Popup from '../../../node_modules/reactjs-popup/dist/index';
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Loader from '../../components/Loader';
import styles from '../../styles/pages/Bundles.module.css'

export default function Bundles(){

  const router = useRouter();
  const [dados,setDados] = useState(null);
  const [open, setOpen] = useState(false)
  const [response, setResponse] = useState(null)

  useEffect(()=>{
    if(!dados){
      getData();
    }          
  },[])

  function getData(){
    setDados(null)
    axios.get('https://api.valdle.com/v1/bundles/random')
    .then(res => {
      setDados(res.data)      
    })
  }

  function verificaResposta(choice){        
    setOpen(true)          
    setResponse(choice)
  }

  return(
    <div className={styles.containerGeral}>
      <Head>
        <title>Guess the Bundle</title>
        <meta name="description" content="Guess the bundle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackButton
        onClick={() => router.push('/')}
      />

      <Popup        
        modal        
        open={open}
        contentStyle={{ 
          padding: '0', 
          display: 'grid',
          border: 'none',                  
        }}
        overlayStyle={{
          backgroundColor: '#00000050'
        }}
      >      
        <div className={styles.containerModal}>          
          <button onClick={() => setOpen(false)} className={styles.btnClose}>
            <img src="/closeIcon.svg" alt="" />
          </button>
          {
            response === dados?.answer ?
              <h2>Acertou miseravi</h2> 
            :
              <h2>Erôu</h2> 
          }

          <div
            className={styles.containerButtonsModal}
          >
            <button
              onClick={() => setOpen(false)}
              className={styles.btnStop}
            >
              Parar
            </button>
            <button 
              onClick={() => {
                setOpen(false)
                getData();
              }}
              className={styles.btnAgain}
            >
              Jogar Novamente
            </button>
          </div>
          
        </div>                  
      </Popup>
      <div className={styles.containerRight}>
        {
          dados ?          
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
          :
            <div>
              <Loader/>
            </div>
        }        
      </div>
    </div>
  )
}