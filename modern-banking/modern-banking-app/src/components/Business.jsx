import React from 'react'
import { features } from '../constants'
import styles, {layout} from '../style'
import Button from './Button'
import FeatureCard from './FeatureCard'

const Business = () =>(
    <section id='features' className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
        You do the business, <br className='sm:block hidden'/>we’ll handle the money
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] m5 mt-5`}>
        With the right credit card, you can improve your financial life by building credit, 
        earning rewards and saving money. 
        </p>

        <Button styles='mt-10'/>

      </div>
      <div className={`${layout.sectionImg} flex-col}`}>
        {features.map((feature, index) =>(
          <FeatureCard key={feature.id} {...feature} index={index}/>    
        ))}
      </div>


    </section>
  )


export default Business


