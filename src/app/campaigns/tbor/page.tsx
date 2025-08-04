export const dynamic = 'force-static'
import fs from 'fs'
import path from 'path'
import * as cheerio from 'cheerio'
import classes from './page.module.css'
import Image from 'next/image'

const topIcon = `
<svg style="height: 0.8em;" viewBox="0 0 24 24"><path d="M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"></path><path d="m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"></path></svg>
`
const upIcon = `
<svg style="height: 0.8em;" viewBox="0 0 24 24"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>
`
const downIcon = `
<svg style="height: 0.8em;" viewBox="0 0 24 24"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path></svg>
`

export default function TBOR() {
  const filePath = path.join(
    process.cwd(),
    'src',
    'app',
    'campaigns',
    'tbor',
    'bor.html',
  )
  const content = fs.readFileSync(filePath, 'utf8')
  const cheerioDom = cheerio.load(content)
  const headings = cheerioDom('h2')
    .map((_, el) => {
      const heading = cheerioDom(el)
      return {
        text: heading.text(),
        id: heading.attr('id'),
      }
    })
    .get()

  cheerioDom('h2').map((i, el) => {
    const heading = cheerioDom(el)
    const text = heading.text()
    heading.html(
      `${text} <a href="#title">${topIcon}</a> <a href="#${
        headings[Math.max(i - 1, 0)].id
      }">${upIcon}</a> <a href="#${
        headings[Math.min(i + 1, headings.length - 1)].id
      }">${downIcon}</a>`,
    )
  })
  return (
    <main className={classes.main}>
      <div id="title" className={classes.title}>
        <h1>The Ann Arbor Tenant Bill of Rights</h1>
        <h2>
          A platform for fair, just, and dignified renting in Ann
          Arbor. By tenants, for tenants.
        </h2>
      </div>
      <div className={classes.logos}>
        <Image
          width="400"
          height="400"
          alt="Ann Arbor Tenants Union logo"
          src="/circle_logo.png"
        />
        <Image
          width="400"
          height="400"
          alt="Huron Valley Democratic Socialists of America logo"
          src="/hvdsa.png"
        />
      </div>
      <div>
        <h2>Table of contents</h2>
        <p>
          {headings.map((heading) => (
            <div key={heading.id}>
              <a
                className={classes.headingLink}
                key={heading.id}
                href={'#' + heading.id}
              >
                {heading.text}
              </a>
            </div>
          ))}
        </p>
      </div>
      <div className={classes.container}>
        <div dangerouslySetInnerHTML={{__html: cheerioDom.html()}} />
      </div>
    </main>
  )
}
