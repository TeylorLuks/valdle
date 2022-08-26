import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'

import { useRouter } from 'next/router'
import { useKeenSlider, KeenSliderPlugin} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useState } from 'react';
import Button from '../components/Button'

export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  
  const dados = [
    {
      gameName: 'GUESS THE MAP',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt02c83424f7b41a97/6243813d8850ee0e8ea0ae56/maps-03ebbf2c074f13a65af1dba0c80f767e.png',
      page: '/map'
    },
    {
      gameName: 'WORDLE',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: 'https://i.pinimg.com/originals/1f/9d/9c/1f9d9c469dd48b9a9f24e2d6c34a8d5c.jpg',
    },
    {
      gameName: 'GUESS THE VOICE',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: 'https://media.discordapp.net/attachments/933773884640096377/1011079982539345992/909837df-dcd5-4019-bde3-d463c08929cf.jpg',
    },
    {
      gameName: 'GUESS THE ABILITY',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: 'https://cdna.artstation.com/p/assets/images/images/037/564/824/large/brandon-mcdonald-memedog2-copy2.jpg?1620717308&dl=1',
    }, 
    {
      gameName: 'GUESS THE BUNDLE',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: 'https://rd1.com.br/wp-content/uploads/2020/09/20200915-rd1-programa-raul-gil.png',
      page: '/bundles'
    }, 
    {
      gameName: 'QUIZZ VALORANT',
      gameDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, quisquam laborum voluptates laboriosam officia pariatur autem hic accusantium magnam amet illum repellat nam, cumque dolore ducimus omnis nisi. Amet labore doloremque voluptate dignissimos et eaque quia doloribus libero vel quasi iure ab porro pariatur in a nam distinctio, necessitatibus, iusto ut. Repellendus incidunt error voluptas.',
      urlCard: 'https://pbs.twimg.com/media/E6Sh8PxXsAYK8Dd.jpg',
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
      perView: 4,
      origin: "center",
      spacing: 30,
    },    
    loop: true,
    rtl: false,    
    mode: "free-snap",
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
        <meta name="description" content="Generated by create next app" />
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
                  height: '80vh',                    
                } : {
                  height: '60vh',                                
                }}
              >                
                <img src={item.urlCard} alt="" />

                {
                  currentSlide === index &&
                    <Button
                      text='JOGAR'
                      onClick={() => {
                        item.page &&
                        router.push(item.page)
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
            >{`<`}</button>
            <p>{currentSlide + 1}/{dados.length}</p>
            <button
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef. current?.next()
              }
            >{`>`}</button>
          </div>          
        </div>

        <div className={styles.containerGameInfo}>
          <div>
            <h1 className={styles.title}>vALDLE</h1>
          </div>
          <div>            
            <h2>
              {dados[currentSlide].gameName}
            </h2>
            <hr />
            <p>
              {dados[currentSlide].gameDescription}
            </p>
          </div>          
        </div>        
      </div>              
    </div>
  )
}
