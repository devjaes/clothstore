'use client'
import React, { useEffect, useRef } from 'react'
import Logo from '@/public/pescao.jpg'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion';

export default function AboutUs() {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView])

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1
            , transition: { staggerChildren: 0.25 }
        },
    }

    const categoriesAnimation = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }
    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial='hidden'
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
            className='bg-white mt-8 py-6'
        >
            <motion.div variants={categoriesAnimation} className='text-gray-800' >
                <div className='bg-gray-800 h-1' />
                <h1 className='text-center font-semibold text-4xl py-6'>Sobre Nostros</h1>
                <div className='bg-gray-800 h-1 ' />
            </motion.div>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControls}
                className='flex justify-center mt-8 max-w-7xl mx-auto'>
                <Image src={Logo} alt='logo' className='rounded-full flex-1' />

                <div className='flex flex-col items-center justify-center text-center p-10 gap-6'>
                    <motion.p
                        variants={categoriesAnimation}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde expedita dolores culpa et consequuntur ratione quos laborum adipisci sed quod dolor non dolore, optio fugit dignissimos similique harum quia qui!
                    </motion.p>
                    <motion.p
                        variants={categoriesAnimation}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores beatae accusantium obcaecati unde cumque exercitationem nostrum dolor, facilis corporis, et maxime molestiae, optio eos minima porro provident fuga. Placeat, exercitationem.
                    </motion.p>
                    <motion.p
                        variants={categoriesAnimation}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum voluptate dolor dolore deserunt suscipit ratione sequi, sint error! Iusto eaque odio reiciendis ab aspernatur placeat eius expedita nostrum quia fugiat.
                    </motion.p>
                </div>
            </motion.div>

        </motion.div >
    )
}
