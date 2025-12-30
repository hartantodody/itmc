'use client'

import Container from '@/components/common/container'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FEATURE_ICONS } from '../common/feature-icon'
import { Sparkles } from 'lucide-react'
import { ABOUT_CONTENT } from '@/data/about.data'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

export default function AboutSection() {
  return (
    <section id='tentang' className='relative py-16 sm:py-20'>
      <Container>
        <motion.div
          variants={stagger}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.3 }}
          className='mx-auto max-w-4xl space-y-12 text-center'
        >
          {/* Header */}
          <motion.div variants={fadeUp} className='space-y-4'>
            <div className='mx-auto inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur'>
              <Sparkles className='h-4 w-4 text-accent' />
              {ABOUT_CONTENT.badge}
            </div>

            <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-5xl'>
              {ABOUT_CONTENT.title}
            </h2>

            <p className='mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
              {ABOUT_CONTENT.description}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div variants={stagger} className='grid gap-4 sm:grid-cols-3'>
            {ABOUT_CONTENT.features.map((item) => (
              <motion.div key={item.key} variants={fadeUp}>
                <Card className='group rounded-3xl bg-card/60 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'>
                  <CardContent className='space-y-3 p-0'>
                    <div className='mx-auto flex h-10 w-10 items-center justify-center rounded-xl border bg-background/60'>
                      {FEATURE_ICONS[item.icon]}
                    </div>
                    <div className='font-heading text-sm font-extrabold'>
                      {item.title}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {item.desc}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div variants={fadeUp} className='space-y-6'>
            <div className='space-y-2'>
              <h3 className='font-heading text-xl font-extrabold'>
                Alur Program Pelatihan
              </h3>
              <p className='text-sm text-muted-foreground'>
                Pendekatan end-to-end dalam pengelolaan event
              </p>
            </div>

            <div className='relative mx-auto max-w-2xl space-y-4'>
              <div className='absolute left-4 top-0 h-full w-px bg-border' />

              {ABOUT_CONTENT.timeline.map((item) => (
                <motion.div
                  key={item.key}
                  variants={fadeUp}
                  className='relative pl-12'
                >
                  <div className='absolute left-2 top-5 h-4 w-4 rounded-full border bg-background'>
                    <div className='absolute inset-0.5 rounded-full bg-primary' />
                  </div>

                  <div className='rounded-2xl border bg-card/60 p-4 text-left backdrop-blur transition hover:shadow-md'>
                    <div className='font-mono text-xs text-muted-foreground'>
                      {item.label}
                    </div>
                    <div className='mt-1 text-sm text-foreground/80'>
                      {item.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
