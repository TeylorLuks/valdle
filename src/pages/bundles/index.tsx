import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { useRouter } from '../../../node_modules/next/router';
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import styles from '../../styles/pages/Bundles.module.css'

export default function Bundles(){
  
  const router = useRouter();
  const [dados,setDados] = useState(null);
  useEffect(()=>{
    axios.get('http://valdle-api.herokuapp.com/api/v1/bundle/',{
      headers:{
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(res => {
      setDados(res.data)
      console.log(res.data)
    })
  },[])

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
                <img src="https://media.valorant-api.com/bundles/cd095669-4a29-a7f3-e00d-f694186863cc/verticalpromoimage.png" alt="bundle" />
              </div>
              <div className={styles.flipCardFront}>
                <img src="/bundleAssets/BackCard.png" alt="BackCard" />
              </div>
            </div>
          </div> 
          <div className={styles.containerButtons}>    
            <button
              onClick={()=> setNumero(numero+1)}
            >1</button>
            <button
             onClick={()=> alert('FUDEU 1')}
            >2</button>
            <button
             onClick={()=> alert('FUDEU 2')}
            >3</button>
            <button
             onClick={()=> alert('FUDEU 3')}
            >4</button>
          </div>
          <Button
            onClick={() => alert('alguma coisa dentro')}
            stylesButton={{
              color: 'var(--white)',
              width: '322px',
              fontSize: '1.1rem'
            }}
            stylesDiv={{
              animationDelay:'3.3s'
            }}
            text='CONFIRMAR'
          />
        </div>

      </div>
    </div>
  )
}