'use client';
import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import getCategories from '@/actions/get-categories';
import { Category } from '@/types';

interface ProductListProps {
    items: Category[]
}

export default function Categories({ items }: ProductListProps) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
            console.log('is in view');
        }
    }, [isInView]);

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.25 },
        },
    };

    const categoriesAnimation = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    console.log(ref);

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
            className='bg-gray-800 mt-8 py-6 pb-11'
            id='categories'>
            <div
                className='text-white'>
                <div className='bg-white h-1' />
                <h1 className='text-center font-semibold text-4xl py-6'>Categorías</h1>
                <div className='bg-white h-1 ' />
            </div>
            <div
                className='flex justify-center mt-8'
            >
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={mainControls}
                    className='grid grid-cols-1 md:grid-cols-2 IpadPro:grid-cols-3 2xl:grid-cols-4 gap-x-16 gap-y-12'>
                    <motion.a
                        variants={categoriesAnimation}
                        whileHover={{ scale: 1.05 }}
                        className={` border-white border-4 rounded-2xl bg-cover bg-center h-64 w-80 `}
                        href={`/category/allProducts`}
                    >
                        <div className='bg-black bg-opacity-50 h-full w-full flex justify-center items-center rounded-2xl hover:bg-opacity-10'>
                            <h1 className='text-white text-center font-semibold text-2xl'>Todos los productos</h1>
                        </div>
                    </motion.a>
                    {items.map((category, index) => (
                        <motion.a
                            variants={categoriesAnimation}
                            whileHover={{ scale: 1.05 }}
                            key={index}
                            className={` border-white border-4 rounded-2xl bg-cover bg-center h-64 w-80 `}
                            href={`/category/${category.id}`}
                        >
                            <div className='bg-black bg-opacity-50 h-full w-full flex justify-center items-center rounded-2xl hover:bg-opacity-10'>
                                <h1 className='text-white text-center font-semibold text-2xl'>{category.name}</h1>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>

        </motion.div >
    )
}










