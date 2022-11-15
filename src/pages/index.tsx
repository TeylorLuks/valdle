import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'

import { useRouter } from 'next/router'
import { useKeenSlider, KeenSliderPlugin} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from 'react';
import Button from '../components/Button'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const size = useWindowSize()
  console.log(size)
  
  const dados = [
    {
      gameName: 'GUESS THE MAP',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: '/cards/mapCard.png',
      page: '/map'
    },
    {
      gameName: 'WORDLE',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',      
    },
    {
      gameName: 'GUESS THE VOICE',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: '/cards/voiceCard.png',
      page: '/voices'
    },
    {
      gameName: 'GUESS THE ABILITY',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',      
    }, 
    {
      gameName: 'GUESS THE BUNDLE',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: '/cards/weaponCard.png',
      page: '/bundles'
    }, 
    {
      gameName: 'QUIZZ VALORANT',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',      
    }
  ]

  const AdaptiveHeight: KeenSliderPlugin = (slider) => {    
    function updateHeight() {      
      console.log(slider)
      // slider.container.style.height = '300px'
      // slider.slides[slider.track.details.rel].style.height = '500px'

      // slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + "px"
    }
    slider.on("created", updateHeight)
    slider.on("slideChanged", updateHeight)
  }

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: size.width <= 768 ? 1 : 4,
      origin: "center",
      spacing: 30,
    },    
    loop: true,
    rtl: false,        
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },    
  }
  ,[AdaptiveHeight]
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Valdle</title>
        <meta name="description" content="Valorant Minigames" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.containerGeral}>                
        <div ref={ref} className={`keen-slider ${styles.slider}`}>
          {
            dados.map((item, index) => (
              <div
                id={`${index}`} 
                key={index} 
                className={`keen-slider__slide ${styles.card}`}
                style={ currentSlide === index ? {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',                    
                  height: size.width <= 768 ? '100vh' : '80vh',                    
                  background: item.urlCard ? `url(${item.urlCard})` : 'var(--grey)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {
                  height: '60vh',                                
                  background: item.urlCard ? `url(${item.urlCard})` : 'var(--grey)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'             
                }}
              >           
                <div className={styles.cardInner}>
                  {
                    !item.page &&
                      <h3>EM DESENVOLVIMENTO</h3>
                  }
                  {
                    size.width <= 768 &&
                    <>
                      <h2>{item.gameName}</h2>
                      <hr />
                      <p>{item.gameDescription}</p>
                    </>
                  }                  
                </div>                                
                {
                  (currentSlide === index && item.page) &&
                    <Button
                      text='JOGAR'
                      onClick={() => {
                        item.page &&
                        router.push(item.page)
                      }}
                      stylesDiv={{
                        width: '100%' 
                                               
                      }}
                      stylesButton={{
                        width: '96%',
                        maxWidth: '96%',
                        backgroundColor: {
                          "/map": "var(--white)",
                          "/voices": "var(--white)"
                        }[item.page],
                        color: {
                          "/map": "var(--color-primary)",
                          "/voices": "var(--color-primary)",
                        }[item.page]
                      }}
                    />                    
                }                                
              </div>        
            ))
          }                
        </div>    
      
        <div className={styles.backgroundCard}>
          <div>
            <button
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()                
              }
            >
              <KeyboardArrowLeftIcon/>
            </button>
            <p>{currentSlide + 1}/{dados.length}</p>
            <button
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef. current?.next()
              }
            >
              <KeyboardArrowRightIcon/>
            </button>
          </div>          
        </div>
        <div className={styles.containerGameInfo}>
          <div>
            <h1 className={styles.title}>vALDLE</h1>
          </div>
          <div>            
            {
              size.width >= 768 ?
                <>
                  <h2>
                    {dados[currentSlide].gameName}
                  </h2>
                  <hr />
                  <p>
                    {dados[currentSlide].gameDescription}
                  </p>
                </>
              :
                <p>{currentSlide + 1}/{dados.length}</p>
            }            
          </div>          
        </div>        
      </div>              
    </div>
  )
}



  
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      const handleResize = () => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    
      // Add event listener
      window.addEventListener("resize", handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
    
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}