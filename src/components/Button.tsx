import styles from '../styles/components/Button.module.css'
export default function Button(){
    return(
        <div 
          className={styles.button}
          onClick={() => {
            item.page &&
              router.push(item.page)
          }}
      >
        <button>
          JOGAR
        </button>
      </div>
    )
}