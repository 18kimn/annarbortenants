'use client'

import {Fragment, useEffect, useState} from 'react'
import styles from './page.module.css'
import {
  Candidate,
  candidates,
  describeCandidate,
  questions,
  races,
  respondents,
} from '@/lib/questionnaire'

const maxSelected = 2
const introId = 'intro'

type Selection = {
  questionId: string
  slugs: string[]
}

const initialSelection: Selection = {
  questionId: introId,
  slugs: respondents.slice(0, maxSelected).map((c) => c.slug),
}

function isKnownTab(id: string) {
  return id === introId || questions.some((q) => q.id === id)
}

function readHash(): Selection {
  const [questionId, ...slugs] = window.location.hash
    .replace(/^#/, '')
    .split('/')

  if (!isKnownTab(questionId)) {
    return initialSelection
  }

  return {
    questionId,
    slugs: slugs
      .filter((slug) => candidates.some((c) => c.slug === slug))
      .slice(0, maxSelected),
  }
}

function toHash({questionId, slugs}: Selection): string {
  return `#${[questionId, ...slugs].join('/')}`
}

function CandidateLink({candidate}: {candidate: Candidate}) {
  return (
    <a
      className={styles.candidateLink}
      href={candidate.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {candidate.name}
    </a>
  )
}

function Answer({
  candidate,
  questionId,
}: {
  candidate: Candidate
  questionId: string
}) {
  const paragraphs = candidate.answers[questionId]

  if (!paragraphs) {
    return (
      <p className={styles.noAnswer}>
        {candidate.name} did not return answers to the questionnaire.
      </p>
    )
  }

  return (
    <div className={styles.answer}>
      {paragraphs.map((lines, index) => (
        <p key={index}>
          {lines.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {lineIndex > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  )
}

export default function Questionnaire({
  children,
}: {
  children: React.ReactNode
}) {
  const [selection, setSelection] = useState(initialSelection)

  useEffect(() => {
    setSelection(readHash())
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', toHash(selection))
  }, [selection])

  const question = questions.find(
    (q) => q.id === selection.questionId,
  )

  const selected = selection.slugs
    .map((slug) => candidates.find((c) => c.slug === slug))
    .filter((c): c is Candidate => c !== undefined)

  const selectTab = (questionId: string) =>
    setSelection((current) => ({...current, questionId}))

  const toggleCandidate = (slug: string) =>
    setSelection((current) => ({
      ...current,
      slugs: current.slugs.includes(slug)
        ? current.slugs.filter((s) => s !== slug)
        : [...current.slugs, slug].slice(-maxSelected),
    }))

  return (
    <div className={styles.root}>
      <nav className={styles.questionBar} aria-label="Questions">
        <button
          type="button"
          className={styles.chip}
          data-active={!question}
          aria-pressed={!question}
          onClick={() => selectTab(introId)}
        >
          Intro
        </button>
        {questions.map((q) => (
          <button
            key={q.id}
            type="button"
            className={styles.chip}
            data-active={q.id === question?.id}
            aria-pressed={q.id === question?.id}
            onClick={() => selectTab(q.id)}
          >
            {q.label}
          </button>
        ))}
      </nav>

      <div className={styles.layout} data-intro={!question}>
        {question && (
          <aside className={styles.sidebar}>
            <nav aria-label="Candidates">
              <h2 className={styles.sidebarTitle}>On the ballot</h2>
              {races.map((race) => (
                <div key={race.id} className={styles.sidebarGroup}>
                  <span className={styles.sidebarGroupName}>
                    {race.name}
                  </span>
                  <div className={styles.sidebarList}>
                    {race.candidates.map((option) => {
                      const active = selection.slugs.includes(
                        option.slug,
                      )
                      return (
                        <button
                          key={option.slug}
                          type="button"
                          className={styles.chip}
                          data-active={active}
                          data-muted={!option.responded}
                          aria-pressed={active}
                          onClick={() => toggleCandidate(option.slug)}
                        >
                          {option.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </aside>
        )}

        <div className={styles.main}>
          {!question ? (
            children
          ) : (
            <>
              <div className={styles.prompt}>
                <h2 className={styles.promptText}>
                  {question.prompt}
                </h2>
                {question.context && (
                  <p className={styles.promptContext}>
                    {question.context}
                  </p>
                )}
              </div>

              {selected.length === 0 ? (
                <p className={styles.empty}>
                  Select a candidate to read their answer.
                </p>
              ) : (
                <div className={styles.columns}>
                  {selected.map((entry) => (
                    <article
                      key={entry.slug}
                      className={styles.column}
                    >
                      <header className={styles.columnHeader}>
                        <CandidateLink candidate={entry} />
                        <span className={styles.candidateSeat}>
                          {describeCandidate(entry)}
                        </span>
                      </header>
                      <Answer
                        candidate={entry}
                        questionId={question.id}
                      />
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
