import data from './questionnaire.json'

export type Question = {
  id: string
  label: string
  prompt: string
  context: string
}

export type Standing = 'incumbent' | 'candidate'

export type Candidate = {
  slug: string
  name: string
  standing: Standing
  url: string
  raceName: string
  responded: boolean
  answers: {[questionId: string]: Paragraph[] | undefined}
}

export type Paragraph = string[]

export type Race = {
  id: string
  name: string
  candidates: Candidate[]
}

type RosterRace = {
  id: string
  name: string
  roster: {
    slug: string
    name: string
    standing: Standing
    url: string
  }[]
}

const roster: RosterRace[] = [
  {
    id: 'mayor',
    name: 'Mayor',
    roster: [
      {
        slug: 'christopher-taylor',
        name: 'Christopher Taylor',
        standing: 'incumbent',
        url: 'https://www.taylorforannarbor.com/',
      },
      {
        slug: 'yousef-rabhi',
        name: 'Yousef Rabhi',
        standing: 'candidate',
        url: 'https://www.voteyousef.com/',
      },
    ],
  },
  {
    id: 'ward-1',
    name: 'Ward 1',
    roster: [
      {
        slug: 'cynthia-harrison',
        name: 'Cynthia Harrison',
        standing: 'incumbent',
        url: 'https://www.votecynthiaharrison.com/',
      },
      {
        slug: 'rebecca-arends',
        name: 'Rebecca Arends',
        standing: 'candidate',
        url: 'https://rebeccaforannarbor.com/',
      },
    ],
  },
  {
    id: 'ward-2',
    name: 'Ward 2',
    roster: [
      {
        slug: 'sandy-aldrich',
        name: 'Sandy Aldrich',
        standing: 'candidate',
        url: 'https://www.votesandyaldrich.com/',
      },
      {
        slug: 'teesha-montague',
        name: 'Teesha Montague',
        standing: 'candidate',
        url: 'https://www.montaguefora2.com/',
      },
    ],
  },
  {
    id: 'ward-3',
    name: 'Ward 3',
    roster: [
      {
        slug: 'ryan-bartholomew',
        name: 'Ryan Bartholomew',
        standing: 'candidate',
        url: 'https://www.ryanbforward3.com/',
      },
      {
        slug: 'ashley-hall',
        name: 'Ashley Hall',
        standing: 'candidate',
        url: 'https://www.ashleyforannarbor.com/',
      },
    ],
  },
  {
    id: 'ward-4',
    name: 'Ward 4',
    roster: [
      {
        slug: 'aidan-sova',
        name: 'Aidan Sova',
        standing: 'candidate',
        url: 'https://www.voteaidansova.com/',
      },
      {
        slug: 'dave-zeglen',
        name: 'Dave Zeglen',
        standing: 'candidate',
        url: 'https://davez4thepeople.com/',
      },
    ],
  },
  {
    id: 'ward-5',
    name: 'Ward 5',
    roster: [
      {
        slug: 'jenn-cornell',
        name: 'Jenn Cornell',
        standing: 'incumbent',
        url: 'https://a2jenn.org/',
      },
      {
        slug: 'greg-monroe',
        name: 'Greg Monroe',
        standing: 'candidate',
        url: 'https://www.gregfora2.com/',
      },
    ],
  },
]

const responses: {
  [slug: string]: {answers: {[id: string]: Paragraph[]}} | undefined
} = data.responses

export const questions: Question[] = data.questions

export const races: Race[] = roster.map((race) => ({
  id: race.id,
  name: race.name,
  candidates: race.roster.map((entry) => {
    const response = responses[entry.slug]
    return {
      ...entry,
      raceName: race.name,
      responded: response !== undefined,
      answers: response?.answers ?? {},
    }
  }),
}))

export const candidates: Candidate[] = races.flatMap(
  (r) => r.candidates,
)
export const respondents = candidates.filter((c) => c.responded)

const standingLabels: Record<Standing, string> = {
  incumbent: 'Incumbent',
  candidate: 'Candidate',
}

export function describeCandidate(candidate: Candidate): string {
  return `${candidate.raceName} · ${standingLabels[candidate.standing]}`
}
