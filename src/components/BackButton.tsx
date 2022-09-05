import styles from '../styles/components/BackButton.module.css'

interface ButtonProps{
  onClick: () => void,
  stylesDiv?: any,
}

export default function BackButton(props : ButtonProps){
  return(
    <button
      className={styles.button}
      style={props.stylesDiv}
      onClick={() => {
        props.onClick()
      }}
    >
      <img src='/setaback.svg' alt="Back" />
      <h4>
        BACK
      </h4>
    </button>
  )
}