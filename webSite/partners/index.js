
import styles from './partners.module.css'
// import CustomArrow from './CustomArrow'

// const settings = {
//   indicators: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 4,
//   nextArrow: <CustomArrow />,
//   prevArrow: <CustomArrow orientation='left' />,
//   responsive: [
//     {
//       breakpoint: 1100,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3
//       }
//     },
//     {
//       breakpoint: 750,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2
//       }
//     },
//     {
//       breakpoint: 500,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// }
const Partners = () => {
  return (
    <div className={styles.partners}>
      <div className={styles.container}>
        <h3 className={styles.title}>TENEMOS A TODOS LOS MEDIOS COMO ALIADOS</h3>
        <p className={styles.text}>
          SELECCIONA EL MEDIO EN EL QUE QUIERAS QUE
          TU PUBLICIDAD APAREZCA, Y NUESTRO EQUIPO LO HARÁ POR TI. ¡SIN PAPELEOS!
        </p>

        <div className={styles.container}>

          <div />
        </div>
      </div>
    </div>
  )
}

export default Partners
