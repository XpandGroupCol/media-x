import { atom } from 'jotai'

export const campaignAtom = atom({
  brand: '',
  name: '',
  startDate: new Date(),
  endDate: null,
  locations: [],
  target: null,
  sector: null,
  ages: [],
  sex: null,
  amount: null,
  url: '',
  publishers: []
})
