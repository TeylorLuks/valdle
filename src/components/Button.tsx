import styles from '../styles/components/Button.module.css'

interface ButtonProps{
  onClick: () => void,
  text: string,
  stylesButton?: StyleSheet,
  stylesDiv?: StyleSheet,
}

export default function Button(props : ButtonProps){
  return(
    <div 
      className={styles.button}
      style={props.stylesDiv}
      onClick={() => {
        props.onClick()
      }}
    >
      <button
        style={props.stylesButton}
      >
        {props.text}
      </button>
    </div>
  )
}