import styles from '../../styles/pages/Bundles.module.css'

export default function Bundles(){
  return(
    <div className={styles.containerGeral}>
      <div>
      
      </div>
      <div>
        <img src="https://media.valorant-api.com/bundles/cd095669-4a29-a7f3-e00d-f694186863cc/verticalpromoimage.png" alt="bundle" />
        <div>    
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </div>
        <button>
          confirmar
        </button>
        <img className={styles.backgroundRight} src="/bundleAssets/guessthebundle.svg" alt="" />
      </div>
    </div>
  )
}