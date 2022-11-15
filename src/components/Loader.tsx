import styles from '../styles/components/Loader.module.css'
interface loaderProps {
  scale?: number 
}

export default function Loader(props : loaderProps){
  return(
    <div 
      className={styles.ldsRoller}
      style={{
        
        transform: `scale(${1*props.scale})`,
        heigth: `${85*props.scale}px`,
        width: `${85*props.scale}px`
      }}
    ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}