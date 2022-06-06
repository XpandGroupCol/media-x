import { atom } from 'jotai'

export const InitCampaignState = {
  logo: null,
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
}

export const campaignAtom = atom({ ...InitCampaignState })
