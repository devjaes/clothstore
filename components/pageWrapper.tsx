'use client'
import { motion, AnimatePresence } from 'framer-motion';

export default function pageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .5, delay: .5 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    )
}
