'use client'
import {Email, OutboundLink} from '@/components/OutboundLink'
import {useEffect, useState} from 'react'
import {Grid} from '@mui/material'
import styles from './page.module.css'
import {printFormattedDate} from '@/utils/date'

const posts = [
  {
    slug: 'ten-reasons',
    name: 'Ten reasons to start a tenants association',
    date: 'May 12, 2024',
  },
  {
    slug: 'yousef-dave-endorsement',
    name: 'The Ann Arbor Tenants Union endorses Dave Zeglen Ward 4 Councilmember, Yousef Rabhi for Mayor',
    date: 'March 3, 2026',
  },
  // {slug: "dez-support", name: "The Ann Arbor Tenants Union stands in full support of Desirae Simmons and opposes the recall campaign by Ypsilanti Forward."},
  // {slug: "junk-fees", name: "The Ann Arbor Tenants Union Announces 'Trash the Junk Fees' Campaign"},
  // {slug: "pretenancy-fees", name: "Ann Arbor Tenants Union celebrates erform, calls out landlord for exorbitant fees"},
  // {slug: ""}
]

export default function News() {
  return (
    <Grid
      container
      justifyContent="center"
      className={styles.container}
    >
      <Grid item className={styles.content}>
        <h1>Press releases and blog posts</h1>
        {posts.map((post) => {
          return (
            <div>
              <h2 className={styles.articleTitle}>
                <a href={'/blog/' + post.slug}>{post.name}</a>
                <p>{post.date}</p>
              </h2>
            </div>
          )
        })}
      </Grid>
    </Grid>
  )
}
