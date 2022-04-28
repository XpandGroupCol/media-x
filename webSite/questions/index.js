import { useState } from 'react'
import Question from './question'
import styles from './questions.module.css'
const Questons = () => {
  const [animate, setAnimate] = useState(null)

  const handleSetAnimate = (index) => () => {
    setAnimate(prevEl => prevEl === index ? null : index)
  }

  return (
    <section className={styles.questions}>
      <div className={styles.container}>
        <h2 className={styles.title}>preguntas frecuentes</h2>
        {[...Array(5).keys()].map((el) =>
          <Question key={el} onChange={handleSetAnimate(el)} active={el === animate} />
        )}

      </div>
    </section>
  )
}

export default Questons
