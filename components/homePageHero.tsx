'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '@/public/LogoAmbivalence.png'
import { motion } from 'framer-motion';

export default function hero() {


    const heroContent = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    }

    return (
        <motion.div
            className='hero-principal text-white'
        >
            <motion.div
                className='absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col items-center justify-center gap-10'
            >
                <motion.div
                    variants={heroContent}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 1, delay: .5 }}
                    className='flex flex-col items-center justify-center gap-8'
                >
                    <Image src={Logo} alt='logo de la marca' className='w-96' />

                    <p className='text-5xl '>Soy capaz.</p>
                    <p className='italic text-xs font-thin'>Incluir slogan de la marca</p>
                    <motion.a
                        whileHover={{ scale: 1.1, y: -1 }}
                        whileTap={{ scale: 0.9 }}
                        href='#categories'
                        className='bg-white text-black px-8 py-4 rounded-full hover:bg-transparent border hover:border-white hover:text-white'>
                        Accede al catálogo
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
