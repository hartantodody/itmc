'use client'

import Container from '@/components/common/container'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Sparkles, Target, GraduationCap } from 'lucide-react'

const TIMELINE = [
  {
    year: '2018',
    text: 'Mulai fokus pengembangan pelatihan berbasis kompetensi untuk MICE & event.'
  },
  {
    year: '2020',
    text: 'Menyelenggarakan program in-house dan publik untuk berbagai institusi.'
  },
  {
    year: '2023',
    text: 'Memperluas topik pelatihan: operasional event, MICE management, dan hybrid event.'
  }
] as const

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
          {/* header */}
          <motion.div variants={fadeUp} className='space-y-4'>
            <div className='mx-auto inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur'>
              <Sparkles className='h-4 w-4 text-accent' />
              Tentang IMTC
            </div>

            <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-5xl'>
              Indonesia MICE Training Center
            </h2>

            <p className='mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
              IMTC berfokus pada pelatihan dan pengembangan kompetensi untuk
              industri MICE & event. Program dirancang agar relevan dengan
              kebutuhan lapangan—mulai dari perencanaan hingga evaluasi
              penyelenggaraan acara.
            </p>
          </motion.div>

          {/* feature cards */}
          <motion.div variants={stagger} className='grid gap-4 sm:grid-cols-3'>
            <FeatureCard
              icon={<GraduationCap className='h-5 w-5 text-primary' />}
              title='Metode'
              desc='Online / offline / in-house'
            />
            <FeatureCard
              icon={<Target className='h-5 w-5 text-primary' />}
              title='Pendekatan'
              desc='Praktik & studi kasus'
            />
            <FeatureCard
              icon={<Sparkles className='h-5 w-5 text-primary' />}
              title='Output'
              desc='Kompetensi kerja terukur'
            />
          </motion.div>

          {/* timeline */}
          <motion.div variants={fadeUp} className='space-y-6'>
            <div className='space-y-2'>
              <h3 className='font-heading text-xl font-extrabold'>
                Perjalanan Singkat
              </h3>
              <p className='text-sm text-muted-foreground'>
                Milestone pengembangan IMTC
              </p>
            </div>

            <div className='relative mx-auto max-w-2xl space-y-4'>
              {/* vertical line */}
              <div className='absolute left-4 top-0 h-full w-px bg-border' />

              {TIMELINE.map((item) => (
                <motion.div
                  key={item.year}
                  variants={fadeUp}
                  className='relative pl-12'
                >
                  {/* dot */}
                  <div className='absolute left-2 top-5 h-4 w-4 rounded-full border bg-background'>
                    <div className='absolute inset-0.5 rounded-full bg-primary' />
                  </div>

                  <div className='rounded-2xl border bg-card/60 p-4 text-left backdrop-blur transition hover:shadow-md'>
                    <div className='font-mono text-xs text-muted-foreground'>
                      {item.year}
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

function FeatureCard({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <motion.div variants={fadeUp}>
      <Card className='group rounded-3xl bg-card/60 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'>
        <CardContent className='space-y-3 p-0'>
          <div className='mx-auto flex h-10 w-10 items-center justify-center rounded-xl border bg-background/60'>
            {icon}
          </div>
          <div className='font-heading text-sm font-extrabold'>{title}</div>
          <div className='text-sm text-muted-foreground'>{desc}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
